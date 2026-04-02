# Third-Party Notices

This file records third-party or upstream material that this workspace keeps alongside the Sebas wrapper layer.

## Included Components

### `qwen-code/`

- Upstream repository: [`QwenLM/qwen-code`](https://github.com/QwenLM/qwen-code)
- License: Apache License 2.0
- Canonical license file: [`qwen-code/LICENSE`](./qwen-code/LICENSE)
- Source files in the vendored copy carry upstream copyright headers from Qwen Team and Google LLC

### `flash-moe/`

- Upstream repository: [`danveloper/flash-moe`](https://github.com/danveloper/flash-moe)
- This workspace keeps the repository at its existing path so the upstream history stays intact
- The upstream README describes the Flash-MoE laptop inference project and the paper-backed implementation details
- No separate top-level license file is tracked in this workspace copy, so confirm upstream terms before redistribution or modification

### `flash-moe-anemll-ios/`

- Upstream repository: [`Anemll/flash-moe`](https://github.com/Anemll/flash-moe)
- The workspace copy preserves the fork history and the existing path layout
- The README identifies this tree as a fork of [`danveloper/flash-moe`](https://github.com/danveloper/flash-moe)
- The README also cites `ncdrone/rustane` as the source of the `--cache-io-split` fanout idea
- No separate top-level license file is tracked in this workspace copy, so confirm upstream and fork-history terms before redistribution or modification

### `project-docs/ollama-web-search-mcp/`

- Local MCP server built on `@modelcontextprotocol/sdk` and `zod`
- `package-lock.json` records the transitive dependency tree and its bundled license metadata
- If this component is redistributed independently, include the dependency notices that apply to the installed npm packages

### `project-docs/`

- Contains experiments, prompts, notes, and supporting materials
- If any file quotes, adapts, or reproduces external material, keep attribution close to the copied content

## Workspace-Level License

- The Sebas workspace itself is distributed under the root [`LICENSE`](./LICENSE)
- If a component has stronger or more specific upstream license terms, those terms take precedence for that component
- This notice file is informational and does not replace the license text shipped with each component
