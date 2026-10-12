import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

/* ============================================================
   microCMS の Webhook 受け口（記事を公開・更新・削除したときに呼ばれる）

   ■ しくみ
   microCMS 側の「Webhook → カスタム通知」に
     URL      : https://npo-tamano-mirai.com/api/revalidate
     シークレット: Vercel の環境変数 MICROCMS_WEBHOOK_SECRET と同じ文字列
   を登録しておくと、公開ボタンを押した直後にここへ POST が届く。
   署名（x-microcms-signature）が正しいときだけ、サイト全ページのキャッシュを
   「古い」印にする。実際の作り直しは次にそのページが開かれたときに1回だけ行われる。

   ■ なぜ必要か
   以前は各ページが60秒ごとに作り直されていて、中身が変わっていなくても
   Vercel の ISR Writes を消費し続けていた（2026年10月の調査）。
   いまは各ページの revalidate を1時間の保険にとどめ、更新の反映はこの Webhook で行う。
   ============================================================ */

type MicroCMSWebhookBody = {
  service?: string;
  api?: string;
  id?: string | null;
  type?: "new" | "edit" | "delete";
};

/** microCMS の署名を検証する。秘密鍵で本文を HMAC-SHA256 した16進文字列と一致すれば正しい */
function isValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  // 長さが違うと timingSafeEqual が例外を投げるので先に弾く
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    // 設定漏れを気づけるように、黙って成功にはしない
    return Response.json(
      { revalidated: false, message: "MICROCMS_WEBHOOK_SECRET が設定されていません" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  if (!isValidSignature(rawBody, request.headers.get("x-microcms-signature"), secret)) {
    return Response.json({ revalidated: false, message: "署名が一致しません" }, { status: 401 });
  }

  let body: MicroCMSWebhookBody = {};
  try {
    body = JSON.parse(rawBody) as MicroCMSWebhookBody;
  } catch {
    // 本文が JSON でなくても、署名が正しければ更新として扱う
  }

  // どの API が変わっても、記事はトップ・一覧・サイドバーなど複数ページに出るため、
  // ルートのレイアウト配下（＝全ページ）をまとめて古い印にする。
  // 更新は月に数回なので、ページを選り分けるより確実さを優先した。
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");

  console.log(`[revalidate] api=${body.api ?? "?"} id=${body.id ?? "-"} type=${body.type ?? "?"}`);

  return Response.json({
    revalidated: true,
    api: body.api ?? null,
    id: body.id ?? null,
    type: body.type ?? null,
    at: new Date().toISOString(),
  });
}
