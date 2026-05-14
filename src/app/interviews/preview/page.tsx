// デザインプレビュー用ページ（静的データ）
// 確認後は /interviews/[slug]/page.tsx に移行する

import Link from "next/link";

const SAMPLE = {
  name: "西 〇〇",
  role: "ボランティアセンター事務局長",
  catchphrase: "人が喜んでくれる——それが全部",
  subtitle: "ボランティアセンター事務局長に聞く、地域を支えるつながりの作り方",
  date: "2026年5月8日",
  tags: ["ボランティア", "地域活動", "防災", "まちづくり"],
  sections: [
    {
      heading: "活動内容 ── 月2回の会議が、地域を動かす",
      body: `私自身の活動の中心は、月2回コーディネーターと開く会議です。コーディネーターが4名いて、私を含めた5名体制で動いています。

会議では、各コーディネーターの活動状況の共有や、地域の課題への対応を議論します。それに向けた資料づくり——毎月どんな作業がどれくらい行われているか、地域のデータを整理・分析して、実態を数字として把握する。そのデータをみんなで共有しながら議論していく、というのが主な仕事です。

住民の方とボランティアをつなぐ「マッチング」は、コーディネーターが中心になってやっています。もっと仕組みとして広げていきたいと思っているのですが、まだ手が追いついていない部分もあります。`,
      pullQuote: null,
    },
    {
      heading: "やりがい ── 「一番活発」という言葉と、間接的に届く感謝",
      body: `コーディネーターが住民の方のところに話を聞きに行って、その困りごとをボランティアさんにつなげ、実際に活動として動き出す——その瞬間が一番嬉しいです。

自分の感想ではなく外から言っていただくのですが、他のボランティアセンターや地区社協の方から「ここが一番活発ですね」と言われることがあります。正直よくわからないのですが（笑）、やっぱり嬉しいですね。

直接ではなく、利用者さんが「ボランティアを受けてとても良かった」「思ったようにきれいにしてもらえた」と言っていたと伝え聞くことが多いです。間接的なことが多いんですが、それがじわっときます。クレームがないというのも、皆さんに喜んでいただけているということだと思っています。`,
      pullQuote: null,
    },
    {
      heading: "地域の課題 ── 「頼みにくいニーズ」をどう拾うか",
      body: `この地域も、想像以上に高齢化が進んでいます。一人暮らしのお年寄り——中でもおじいさんは、訪問するとものすごく話してくださる。孤独感が強いんだなと、すごく感じます。

一方で、一人暮らしのおばあさんは「こういうことをお願いしたい」と思っていても、言い出せない方が多い。別のところで話を聞いていてやっと打ち明けられた、という方もいて——「頼みにくいニーズ」をどう拾うかが大きな課題だと思っています。

電球が替えられなくなった、重いものが運べなくなった、これからどんどん一人ではできないことが増えていく。「正式にお願いする」というハードルよりも、ちょっとお話ししたい、一緒に散歩したいという、日常の中でさりげなく支え合えるものが今、本当に必要だと感じています。

隣近所の人たちが一人一人と顔なじみになれる、そういった環境をつくっていくことが一つ。安心して住み続けられる地域にするために、まずそこからだと思っています。`,
      pullQuote: "ちょっとお話ししたい、一緒に散歩したい——そういうものが、今本当に必要だと感じています",
    },
    {
      heading: "町内会の活動 ── 防災マップで「つながり」を生む",
      body: `今、力を入れているのが防災会の立ち上げと、防災マップの作成です。

防災会は、市が示しているマニュアル通りに書類を整えれば形としては作れます。でもそれだけでは「形だけの防災会」になってしまう。本当に役立つ防災のネットワークにしたくて、令和8・9年度をかけて、地図だけでなく地域の防災上の強み・弱み・危険箇所も含めた防災マップを作ろうとしています。

その第一歩として、今年3月5日に「まち歩き」を実施しました。みんなで実際に地域を歩きながら、防災の視点でチェックしていく。このような「一緒に動く体験」が、つながりを生む新しい場になっています。

最高で13人集まったことがありました。その中にお子さんを2人連れて来てくださった方がいて、それが一番嬉しかったです。動いているのが70〜80代ばかりになりがちなので、若い世代に入ってきてもらえることが本当に大切なんです。

町内会の総会も、毎回少しずつ顔ぶれが変わってきている手応えがあります。「一声かけてもらったから来た」という方が多い——一人誘ったら、それが二人・三人に広がっていく。そういうことの積み重ねだと思っています。

昔みたいなお花見も減り、高度成長の頃に「町内会はいらない」という時代もあった。でも歳を重ねるほど、自分が住む地域への愛着が大事になってくる。「ここはいいところだ」と思えるかどうかが、生活の質に直結すると実感しています。`,
      pullQuote: null,
    },
    {
      heading: "原動力 ── 人が喜んでくれることが好き",
      body: `根本的には、人が喜んでくれることが好きなんだと思います。子どもの頃からそういう気質が自分にはあるようで（笑）。

リーダーとして引っ張るというより、「ちょっと早めに行って準備しておく」タイプ。表に出るというより、人が喜んでいる顔を見たいという感じです。

前職（県庁職員）の頃から、人と関わる仕事がしたいと思っていました。福祉関係を希望していたけれど、なかなかそこには配属されなかった。それでも退職後に地域活動に関わる流れの中で、今の仕事につながってきた。「ああ、ここに来たんだな」という感じがしています。

必要とされているという実感が、やっぱり嬉しいんです。`,
      pullQuote: null,
    },
    {
      heading: "10年後の地域へ ── 「挨拶ができる」ところから",
      body: `どんどん人口が減って、高齢化が進んでいく。そういう中で、どうやって楽しくて居心地のいい地域を作っていくかが問われていると思います。

そのためにまず大切なのは、挨拶じゃないかな。ちゃんと顔を合わせて「おはよう」が言える地域。私が子どもの頃は、知らない人でも地域の人なら当たり前に声をかけてもらえた。でも今はそれがどんどん難しくなっている。

関わりたい人が関われる、関わってほしい人に関わってもらえる——そういう地域でいてほしいし、そういう場を作り続けていきたいと思っています。`,
      pullQuote: null,
    },
  ],
};

const RELATED = [
  {
    name: "田中 〇〇",
    role: "有機農家",
    catchphrase: "玉野の土で、玉野の器を",
    slug: "tanaka",
  },
  {
    name: "林 〇〇",
    role: "漁師・宇野漁港",
    catchphrase: "夜明け4時、海と向き合う",
    slug: "hayashi",
  },
];

export default function InterviewPreviewPage() {
  return (
    <div className="bg-paper min-h-screen">

      {/* ── Hero: 左写真 + 右プロフィール ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

        {/* 左: 人物写真 */}
        <div className="relative bg-paper-deep overflow-hidden min-h-[340px] lg:min-h-[560px]">
          <img
            src="/interview-nishi.jpg"
            alt="西さん（田井地区ボランティアセンター前）"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* 右: プロフィール情報 */}
        <div
          className="flex flex-col justify-end px-10 py-14 lg:px-16 min-h-[480px] lg:min-h-[560px]"
          style={{ background: "linear-gradient(160deg, #6b3209 0%, #9a500f 50%, #c86d1a 100%)" }}
        >
          {/* ラベル */}
          <div className="flex items-center gap-2 mb-10">
            <span className="section-label text-white/40">INTERVIEW</span>
            <span className="text-white/20 text-xs">—</span>
            <span className="section-label text-white/50">動く人たち</span>
          </div>

          {/* キャッチコピー（引用）— 大きく上に */}
          <p
            className="font-serif leading-tight mb-6"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "rgba(255,255,255,0.95)" }}
          >
            ❝ {SAMPLE.catchphrase} ❞
          </p>

          {/* 区切り */}
          <div className="w-10 h-px mb-6" style={{ background: "#c86d1a" }} />

          {/* 肩書き + 名前 */}
          <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-2">
            {SAMPLE.role}
          </p>
          <h1 className="text-3xl font-bold text-white font-serif leading-tight">
            {SAMPLE.name}
          </h1>
        </div>
      </div>

      {/* ── サブタイトル + メタ ── */}
      <div className="border-b border-border-line bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="section-label text-ink-muted mb-3">INTERVIEW</p>
          <h2
            className="font-bold text-ink leading-snug mb-5 font-serif"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)" }}
          >
            {SAMPLE.subtitle}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span>{SAMPLE.date}</span>
            <span className="text-border-line">|</span>
            <span>取材・編集：NPO法人 玉野SDGsみらいづくりセンター</span>
          </div>
        </div>
      </div>

      {/* ── 本文 ── */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div>
          {SAMPLE.sections.map((section, i) => (
            <div key={i} className={i !== 0 ? "mt-16" : ""}>

              {/* B: 巨大番号グラフィック + 見出し */}
              <div className="mb-7 relative">
                {/* 背景の巨大数字 */}
                <span
                  className="absolute font-black tabular-nums select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "9rem",
                    color: "#c86d1a",
                    opacity: 0.07,
                    top: "-1.5rem",
                    left: "-1rem",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* 小さいラベル */}
                <div className="flex items-center gap-3 mb-3 relative">
                  <span
                    className="font-black tracking-widest tabular-nums"
                    style={{ color: "#c86d1a", fontSize: "0.65rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "#c86d1a", opacity: 0.2 }} />
                </div>
                <h3
                  className="font-bold text-ink font-serif leading-snug relative"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)" }}
                >
                  {section.heading}
                </h3>
              </div>

              {/* 本文（最初の段落だけ少し大きく） */}
              <div className="space-y-5">
                {section.body.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className="text-ink-soft leading-[2] tracking-wide"
                    style={{ fontSize: j === 0 ? "1.025rem" : "0.975rem" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* 途中写真（セクション2の後） */}
              {i === 1 && (
                <div className="my-14 -mx-6 relative overflow-hidden">
                  <img
                    src="/interview-nishi-2.jpg"
                    alt="インタビュー中の西さん"
                    className="w-full object-cover"
                    style={{ maxHeight: "520px", objectPosition: "center 20%" }}
                  />
                  {/* ダークオーバーレイ + キャプション */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-5"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
                  >
                    <p className="text-white/90 text-xs tracking-widest section-label">
                      田井地区ボランティアセンター「ぬくもり」にて
                    </p>
                  </div>
                </div>
              )}

              {/* Pull Quote */}
              {section.pullQuote && (
                <div className="my-14 -mx-6 px-8 py-10 relative overflow-hidden bg-paper-alt">
                  {/* 装飾用の大きな引用符 */}
                  <span
                    className="absolute font-serif select-none pointer-events-none"
                    style={{
                      fontSize: "14rem",
                      lineHeight: 1,
                      color: "#c86d1a",
                      opacity: 0.08,
                      top: "-2rem",
                      left: "1rem",
                    }}
                  >
                    ❝
                  </span>
                  {/* アンバーの縦ライン */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ background: "linear-gradient(to bottom, #c86d1a, #e07e24)" }}
                  />
                  <p
                    className="relative font-serif text-ink leading-relaxed"
                    style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)" }}
                  >
                    {section.pullQuote}
                  </p>
                  <p className="relative mt-4 text-xs tracking-widest text-ink-muted section-label">
                    — {SAMPLE.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── タグ ── */}
        <div className="mt-14 pt-8 border-t border-border-line flex flex-wrap gap-2">
          {SAMPLE.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-border-line text-ink-muted px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ── 取材クレジット ── */}
        <div className="mt-8 p-5 bg-paper-alt rounded-xl text-sm text-ink-muted leading-relaxed border border-border-line">
          <p className="font-semibold text-ink mb-1">取材・編集</p>
          <p>NPO法人 玉野SDGsみらいづくりセンター</p>
          <p className="mt-1 text-xs">この記事は、地域で活動する方々の声を届けるインタビュー企画の一環として作成しました。</p>
        </div>

        {/* ── 一覧へ戻る ── */}
        <Link
          href="/interviews"
          className="inline-flex items-center gap-2 mt-8 section-label text-ink-muted hover:text-ink transition-colors"
        >
          ← 動く人たち 一覧へ
        </Link>
      </div>

      {/* ── 関連インタビュー ── */}
      <div className="border-t border-border-line bg-paper-alt py-14">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-label text-ink-muted mb-8">OTHER INTERVIEWS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RELATED.map((person) => (
              <Link
                key={person.slug}
                href={`/interviews/${person.slug}`}
                className="group flex gap-4 p-5 bg-white rounded-xl border border-border-line hover:border-forest transition-colors card-interactive"
              >
                {/* アバター */}
                <div
                  className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: "linear-gradient(135deg, #1e4d38, #2e7d52)" }}
                >
                  {person.name.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-ink-muted mb-1">{person.role}</p>
                  <p className="font-bold text-ink group-hover:text-forest transition-colors leading-snug">
                    {person.name}
                  </p>
                  <p className="text-sm text-ink-muted mt-1 line-clamp-1">
                    ❝ {person.catchphrase} ❞
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
