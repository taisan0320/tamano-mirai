import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export interface Interview {
  slug: string;
  name: string;
  role: string;
  catchphrase: string;
  subtitle: string;
  photo?: string;
  body: string; // HTML
  date: string;
  tags?: string[];
}

// ─── Static fallback data ────────────────────────────────────────────────────

const NISHI_BODY = `<h2>活動内容 ── 月2回の会議が、地域を動かす</h2>
<p>私自身の活動の中心は、月2回コーディネーターと開く会議です。コーディネーターが4名いて、私を含めた5名体制で動いています。</p>
<p>会議では、各コーディネーターの活動状況の共有や、地域の課題への対応を議論します。それに向けた資料づくり——毎月どんな作業がどれくらい行われているか、地域のデータを整理・分析して、実態を数字として把握する。そのデータをみんなで共有しながら議論していく、というのが主な仕事です。</p>
<p>住民の方とボランティアをつなぐ「マッチング」は、コーディネーターが中心になってやっています。もっと仕組みとして広げていきたいと思っているのですが、まだ手が追いついていない部分もあります。</p>

<h2>やりがい ── 「一番活発」という言葉と、間接的に届く感謝</h2>
<p>コーディネーターが住民の方のところに話を聞きに行って、その困りごとをボランティアさんにつなげ、実際に活動として動き出す——その瞬間が一番嬉しいです。</p>
<p>自分の感想ではなく外から言っていただくのですが、他のボランティアセンターや地区社協の方から「ここが一番活発ですね」と言われることがあります。正直よくわからないのですが（笑）、やっぱり嬉しいですね。</p>
<p>直接ではなく、利用者さんが「ボランティアを受けてとても良かった」「思ったようにきれいにしてもらえた」と言っていたと伝え聞くことが多いです。間接的なことが多いんですが、それがじわっときます。クレームがないというのも、皆さんに喜んでいただけているということだと思っています。</p>

<img src="/interview-nishi-2.jpg" alt="田井地区ボランティアセンター「ぬくもり」にて" />

<h2>地域の課題 ── 「頼みにくいニーズ」をどう拾うか</h2>
<p>この地域も、想像以上に高齢化が進んでいます。一人暮らしのお年寄り——中でもおじいさんは、訪問するとものすごく話してくださる。孤独感が強いんだなと、すごく感じます。</p>
<p>一方で、一人暮らしのおばあさんは「こういうことをお願いしたい」と思っていても、言い出せない方が多い。別のところで話を聞いていてやっと打ち明けられた、という方もいて——「頼みにくいニーズ」をどう拾うかが大きな課題だと思っています。</p>
<p>電球が替えられなくなった、重いものが運べなくなった、これからどんどん一人ではできないことが増えていく。「正式にお願いする」というハードルよりも、ちょっとお話ししたい、一緒に散歩したいという、日常の中でさりげなく支え合えるものが今、本当に必要だと感じています。</p>
<p>隣近所の人たちが一人一人と顔なじみになれる、そういった環境をつくっていくことが一つ。安心して住み続けられる地域にするために、まずそこからだと思っています。</p>

<blockquote>ちょっとお話ししたい、一緒に散歩したい——そういうものが、今本当に必要だと感じています</blockquote>

<h2>町内会の活動 ── 防災マップで「つながり」を生む</h2>
<p>今、力を入れているのが防災会の立ち上げと、防災マップの作成です。</p>
<p>防災会は、市が示しているマニュアル通りに書類を整えれば形としては作れます。でもそれだけでは「形だけの防災会」になってしまう。本当に役立つ防災のネットワークにしたくて、令和8・9年度をかけて、地図だけでなく地域の防災上の強み・弱み・危険箇所も含めた防災マップを作ろうとしています。</p>
<p>その第一歩として、今年3月5日に「まち歩き」を実施しました。みんなで実際に地域を歩きながら、防災の視点でチェックしていく。このような「一緒に動く体験」が、つながりを生む新しい場になっています。</p>
<p>最高で13人集まったことがありました。その中にお子さんを2人連れて来てくださった方がいて、それが一番嬉しかったです。動いているのが70〜80代ばかりになりがちなので、若い世代に入ってきてもらえることが本当に大切なんです。</p>
<p>町内会の総会も、毎回少しずつ顔ぶれが変わってきている手応えがあります。「一声かけてもらったから来た」という方が多い——一人誘ったら、それが二人・三人に広がっていく。そういうことの積み重ねだと思っています。</p>
<p>昔みたいなお花見も減り、高度成長の頃に「町内会はいらない」という時代もあった。でも歳を重ねるほど、自分が住む地域への愛着が大事になってくる。「ここはいいところだ」と思えるかどうかが、生活の質に直結すると実感しています。</p>

<h2>原動力 ── 人が喜んでくれることが好き</h2>
<p>根本的には、人が喜んでくれることが好きなんだと思います。子どもの頃からそういう気質が自分にはあるようで（笑）。</p>
<p>リーダーとして引っ張るというより、「ちょっと早めに行って準備しておく」タイプ。表に出るというより、人が喜んでいる顔を見たいという感じです。</p>
<p>前職（県庁職員）の頃から、人と関わる仕事がしたいと思っていました。福祉関係を希望していたけれど、なかなかそこには配属されなかった。それでも退職後に地域活動に関わる流れの中で、今の仕事につながってきた。「ああ、ここに来たんだな」という感じがしています。</p>
<p>必要とされているという実感が、やっぱり嬉しいんです。</p>

<h2>10年後の地域へ ── 「挨拶ができる」ところから</h2>
<p>どんどん人口が減って、高齢化が進んでいく。そういう中で、どうやって楽しくて居心地のいい地域を作っていくかが問われていると思います。</p>
<p>そのためにまず大切なのは、挨拶じゃないかな。ちゃんと顔を合わせて「おはよう」が言える地域。私が子どもの頃は、知らない人でも地域の人なら当たり前に声をかけてもらえた。でも今はそれがどんどん難しくなっている。</p>
<p>関わりたい人が関われる、関わってほしい人に関わってもらえる——そういう地域でいてほしいし、そういう場を作り続けていきたいと思っています。</p>`;

const staticInterviews: Interview[] = [
  {
    slug: "nishi-volunteer-center",
    name: "西 〇〇",
    role: "ボランティアセンター事務局長",
    catchphrase: "人が喜んでくれる——それが全部",
    subtitle: "ボランティアセンター事務局長に聞く、地域を支えるつながりの作り方",
    photo: "/interview-nishi.jpg",
    body: NISHI_BODY,
    date: "2026-05-08",
    tags: ["ボランティア", "地域活動", "防災", "まちづくり"],
  },
  {
    slug: "hayashi-fisherman",
    name: "林 〇〇",
    role: "漁師・宇野漁港",
    catchphrase: "夜明け4時、海と向き合う",
    subtitle: "宇野漁港で30年。父から受け継いだ船で、瀬戸内の朝に出る林さんに会いに行きました。",
    body: "<p>（記事は準備中です）</p>",
    date: "2026-04-18",
    tags: ["漁業", "宇野漁港", "瀬戸内海"],
  },
  {
    slug: "tanaka-organic-farmer",
    name: "田中 〇〇",
    role: "有機農家",
    catchphrase: "玉野の土で、玉野の食を",
    subtitle: "玉野市で有機農業に取り組む若手農家の田中さん。地域農業の課題と、新しい農業の形について語ってもらいました。",
    body: "<p>（記事は準備中です）</p>",
    date: "2026-03-20",
    tags: ["農業", "有機農業", "若者"],
  },
];

// ─── microCMS integration ────────────────────────────────────────────────────

type CMSInterview = MicroCMSListContent & {
  name: string;
  role: string;
  catchphrase: string;
  subtitle: string;
  photo?: { url: string };
  body: string;
  date?: string;
  tags?: string[];
};

const client =
  process.env.MICROCMS_SERVICE_DOMAIN &&
  process.env.MICROCMS_API_KEY &&
  !process.env.MICROCMS_SERVICE_DOMAIN.startsWith("your-")
    ? createClient({
        serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
        apiKey: process.env.MICROCMS_API_KEY,
      })
    : null;

function cmsToInterview(item: CMSInterview): Interview {
  return {
    slug: item.id,
    name: item.name,
    role: item.role,
    catchphrase: item.catchphrase,
    subtitle: item.subtitle,
    photo: item.photo?.url,
    body: item.body,
    date: item.date ?? item.publishedAt ?? new Date().toISOString(),
    tags: item.tags,
  };
}

export async function fetchAllInterviews(limit = 20): Promise<Interview[]> {
  if (client) {
    try {
      const res = await client.getList<CMSInterview>({
        endpoint: "interviews",
        queries: { limit, orders: "-date" },
      });
      return res.contents.map(cmsToInterview);
    } catch {
      // endpoint not yet created – fall through to static data
    }
  }
  return [...staticInterviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function fetchInterviewBySlug(slug: string): Promise<Interview | null> {
  if (client) {
    try {
      const item = await client.getListDetail<CMSInterview>({
        endpoint: "interviews",
        contentId: slug,
      });
      return cmsToInterview(item);
    } catch {
      // fall through to static data if not found in CMS yet
    }
  }
  return staticInterviews.find((i) => i.slug === slug) ?? null;
}

export async function fetchAllInterviewSlugs(): Promise<string[]> {
  if (client) {
    try {
      const res = await client.getList<CMSInterview>({
        endpoint: "interviews",
        queries: { limit: 100, fields: "id" },
      });
      return res.contents.map((a) => a.id);
    } catch {
      // endpoint not yet created – fall through to static data
    }
  }
  return staticInterviews.map((i) => i.slug);
}
