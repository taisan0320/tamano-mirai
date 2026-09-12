import { cache } from "react";
import { createClient } from "microcms-js-sdk";

/* microCMS の「トップページ設定」（オブジェクト形式 API「top」）。
   トップの記事・今週のピックアップ・みらいCafeの予定を1つの画面で管理する。
   無料プランは API が5つまでなので、サイト全体の設定はここにまとめる。

   1回の表示の中でトップの記事とみらいCafeの両方から呼ばれるため、
   React の cache で包み、取得は1回で済ませる。 */

const client =
  process.env.MICROCMS_SERVICE_DOMAIN &&
  process.env.MICROCMS_API_KEY &&
  !process.env.MICROCMS_SERVICE_DOMAIN.startsWith("your-")
    ? createClient({
        serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
        apiKey: process.env.MICROCMS_API_KEY,
      })
    : null;

const fetchTopRaw = cache(async (): Promise<unknown> => {
  if (!client) return null;
  try {
    return await client.getObject({ endpoint: "top" });
  } catch {
    // API が未作成・リスト形式で作られている・通信失敗のときは、
    // 呼び出し側がそれぞれの既定の表示に戻す
    return null;
  }
});

/** 「トップページ設定」の中身。取れなければ null */
export async function fetchTopObject<T>(): Promise<T | null> {
  return (await fetchTopRaw()) as T | null;
}
