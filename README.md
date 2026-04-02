# Sebas Workspace

Sebas は、ローカル実行用の Qwen 系エンジンと、それを呼び出すための薄い操作レイヤーをまとめた親 workspace です。

この repo の役割は、実体の各リポジトリを動かしやすい形で束ねることです。正規の入口はトップレベルの `./sebas` で、`./workspace` は後方互換の alias として残しています。

## What This Repo Contains

- `sebas`: 主要な実行コマンド
- `workspace`: `sebas` の互換エントリ
- `apps/`: 利用者向けの安定 entrypoint
- `tools/`: 起動・運用・ベンチ用 wrapper
- `docs/`: workspace の設計と運用方針
- `engines/`: エンジン構成の整理メモ
- `project-docs/`: 実験メモ、検証用プロンプト、関連資料

## Quick Start

```bash
./sebas list
./sebas doctor local-122b
./sebas run local-122b
./sebas doctor local-35b
./sebas run local-35b
./sebas run engine-only --engine qwen122b
./sebas run engine-only --engine qwen35b
./sebas bench local-122b
```

## Current Layout

- `qwen-code/`: qwen-code 本体
- `flash-moe/`: FlashMoE の実体
- `flash-moe-anemll-ios/`: iOS / 122B 系の実体
- `apps/`, `tools/`, `docs/`, `engines/`: Sebas の親レイヤー側の案内と wrapper

## Notes

- 実体の各リポジトリは、履歴保全のため既存パスのまま保持しています
- `.gitignore` で `.qwen/`、`.workspace/`、`node_modules/`、既存 repo 本体を除外しています
- 新しい変更は、まず親 workspace 側の案内や wrapper に寄せるのが基本です

## Third-Party Material

- まとめは [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) を参照してください
