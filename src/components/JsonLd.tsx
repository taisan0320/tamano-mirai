/* 構造化データ（JSON-LD）を埋め込む。画面には何も表示されない。
   中身は src/lib/seo.ts で組み立てる。 */

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
