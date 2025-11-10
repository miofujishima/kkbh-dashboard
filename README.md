# KKBH Global経営ダッシュボード

グローバル経営をリアルタイムで可視化するダッシュボードシステム

## 機能

- 📊 リアルタイム・日次・週次・月次のモニタリング
- 🎨 色とパターンで区別できる色彩バリアフリー対応
- 🔐 管理者モードでの編集機能
- 💾 データの自動保存（localStorage）
- 📥 データのインポート/エクスポート
- 🌍 120カ国以上の国旗アイコン対応

## セットアップ

### ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` フォルダに出力されます。

## 管理者モード

1. 右上の設定アイコンをクリック
2. パスワード入力: `msmdashboard`
3. 編集・保存が可能になります

## デプロイ

このプロジェクトはVercelに最適化されています。

1. GitHubにプッシュ
2. Vercelでインポート
3. 自動デプロイ

## 技術スタック

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

## ライセンス

Private - KKBH Internal Use Only
