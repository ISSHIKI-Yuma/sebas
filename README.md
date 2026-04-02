# Sebas Project

このプロジェクトは、`qwen-code`、`flash-moe-anemll-ios`、`flash-moe` をまとめて扱う Sebas の親レイヤーです。  
正規の起動導線はトップレベルの `./sebas` で、`./workspace` は互換 alias として残しています。

## Primary Commands

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

## Layout

- `apps/`: 利用者向けの安定 entrypoint
- `tools/`: 運用・起動・ベンチ用の wrapper
- `docs/`: Sebas の設計と運用方針
- `engines/`: エンジン系の責務整理メモ

現在は Git 履歴保全のため、実体の各リポジトリは既存パスのまま保持しています。`./sebas` がそれらを束ねる単一導線で、`./workspace` は互換 alias です。
