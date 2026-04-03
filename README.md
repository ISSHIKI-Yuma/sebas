# Sebas Workspace

Sebas は、ローカル実行用の Qwen 系エンジンと、それを使う Rust ベースの AI エージェント runtime をまとめた親 workspace です。

正規の入口はトップレベルの `./sebas` で、`./workspace` は後方互換 alias として残しています。現行の agent 層は `rust/` 配下の crate 群が本体で、`qwen-code/` は移行期間中の legacy 依存として保持しています。

## What This Repo Contains

- `sebas`: 主要な実行コマンド
- `workspace`: `sebas` の互換エントリ
- `rust/`: Sebas agent runtime / CLI / tools / plugins
- `apps/`: 利用者向けの安定 entrypoint
- `tools/`: 起動・運用・ベンチ用 wrapper
- `docs/`: workspace の設計と運用方針
- `engines/`: エンジン構成の整理メモ
- `project-docs/`: 実験メモ、検証用プロンプト、関連資料

## Quick Start

```bash
./sebas engine doctor --engine qwen122b
./sebas chat --engine qwen122b
./sebas engine doctor --engine qwen35b
./sebas chat --engine qwen35b
./sebas run engine-only --engine qwen122b
./sebas run engine-only --engine qwen35b
./sebas prompt --engine qwen122b "hello"
./sebas config import-qwen
./sebas engine bench --engine qwen122b
```

## Current Layout

- `rust/`: claw-code-parity ベースで再構成した Sebas の agent layer
- `qwen-code/`: 旧 agent/frontend 実装。既定導線からは外した legacy tree
- `flash-moe/`: FlashMoE の実体
- `flash-moe-anemll-ios/`: iOS / 122B 系の実体
- `apps/`, `tools/`, `docs/`, `engines/`: Sebas の親レイヤー側の案内と wrapper

## Notes

- 実体の各リポジトリは、履歴保全のため既存パスのまま保持しています
- `.claw/` が canonical config / session surface です。`.claude/` と `.codex/` は互換 discovery、`.qwen/` は import 対象です
- `.gitignore` で `.qwen/`、`.workspace/`、`node_modules/`、既存 repo 本体を除外しています
- 新しい変更は、まず親 workspace 側の案内や wrapper に寄せるのが基本です

## Third-Party Material

- まとめは [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) を参照してください
