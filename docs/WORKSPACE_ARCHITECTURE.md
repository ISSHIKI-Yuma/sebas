# Sebas Project Architecture

## Intent

Sebas Project は、実験用エンジン、IDE/CLI フロントエンド、補助スクリプトを別 Git 履歴のまま扱いながら、日常運用の入口だけを統一する。

## Canonical Paths

- `rust`: Sebas の agent runtime / TUI / tool execution / config surface
- `qwen-code`: 旧フロントエンドとオーケストレーション UI。移行期間中の legacy tree
- `flash-moe-anemll-ios`: 主開発対象の推論エンジン
- `flash-moe`: 参照実装
- `.workspace/manifest.json`: 上位ランタイム設定
- `sebas`: Sebas 共通 CLI
- `workspace`: 互換 alias

## Current Policy

- 利用者向けの正規導線は `sebas` と `apps/` 配下に寄せる
- 旧トップレベルスクリプトは互換 shim としてのみ維持する
- `flash-moe-anemll-ios` に未コミット作業がある前提で、上位 orchestration 層から先に整理する
- agent layer は `rust/` 側へ集約し、`sebas` は `qwen-code` を直接叩かない
- canonical config / session / skill surface は `.claw/` と `~/.claw/`
- `.claude/` と `.codex/` は compatibility read、`.qwen/` は import/migration 対象
