import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SEARCH_API_URL = "https://ollama.com/api/web_search";
const DEFAULT_ENV_PATH = path.join(os.homedir(), ".config", "ollama-web-search.env");

async function loadApiKey() {
  const envKey = process.env.OLLAMA_API_KEY?.trim();
  if (envKey) {
    return envKey;
  }

  const envFile = process.env.OLLAMA_WEB_SEARCH_ENV_FILE || DEFAULT_ENV_PATH;
  try {
    const raw = await readFile(envFile, "utf8");
    const match = raw.match(/OLLAMA_API_KEY=(['"]?)(.+?)\1\s*$/m);
    if (match?.[2]?.trim()) {
      return match[2].trim();
    }
  } catch {
    // Fall through to explicit error below.
  }

  throw new Error(
    "OLLAMA_API_KEY is not configured. Save it in ~/.config/ollama-web-search.env or export it in your shell."
  );
}

function formatResults(query, results) {
  const lines = [
    `Search query: ${query}`,
    `Fetched at: ${new Date().toISOString()}`,
    `Items: ${results.length}`,
    "",
  ];

  results.forEach((result, index) => {
    lines.push(`${index + 1}. ${result.title || "(untitled)"}`);
    if (result.url) {
      lines.push(`   URL: ${result.url}`);
    }
    if (result.content) {
      const snippet = result.content.replace(/\s+/g, " ").trim().slice(0, 500);
      if (snippet) {
        lines.push(`   Snippet: ${snippet}`);
      }
    }
    lines.push("");
  });

  return lines.join("\n").trim();
}

async function runSearch(query, maxResults) {
  const apiKey = await loadApiKey();
  const response = await fetch(SEARCH_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      max_results: maxResults,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Ollama web_search failed (${response.status}): ${body.slice(0, 400)}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.results) ? payload.results : [];
}

const server = new McpServer({
  name: "ollama-web-search",
  version: "0.1.0",
});

server.tool(
  "web_search",
  {
    query: z.string().min(1, "query is required"),
    max_results: z.number().int().min(1).max(10).default(5),
  },
  async ({ query, max_results }) => {
    const normalizedQuery = query.trim();
    const results = await runSearch(normalizedQuery, max_results);
    return {
      content: [
        {
          type: "text",
          text: formatResults(normalizedQuery, results),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
