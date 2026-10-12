This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 記事更新の反映（microCMS Webhook）

各ページは1時間ごとに作り直される保険（`revalidate = 3600`）を持ちつつ、
記事の公開・更新・削除は microCMS の Webhook で即時に反映します。

1. Vercel のプロジェクト設定 → Environment Variables に `MICROCMS_WEBHOOK_SECRET`（長いランダムな文字列）を Production / Preview に追加し、再デプロイする
2. microCMS の API 設定 → Webhook → カスタム通知 で次を登録する
   - URL: `https://npo-tamano-mirai.com/api/revalidate`
   - シークレット: 1 と同じ文字列
   - 通知タイミング: 「公開時・更新時」「公開終了時」「削除時」（下書き保存は不要）
   - `articles` `interviews` `lessons` `student-teams` `documents` `top` の各 API で同じ設定を行う
3. 記事を公開して1分以内にトップページへ反映されれば完了

Webhook が届くと全ページが「古い」印になり、次に開かれたときに1回だけ作り直されます。
2026年10月の調査では、60秒ごとの再生成が Vercel の ISR Writes の大半を占めていたため、この方式に変更しました。
