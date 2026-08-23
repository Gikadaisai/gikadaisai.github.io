/**
 * 技科大祭2026 協賛企業データ
 *
 * 各項目の説明:
 * - name: 会社名・団体名（必須）
 * - amount: 協賛金額（数値。例: 500000 = 50万円）
 * - logo: ロゴ画像のパス（例: "logos/toyota.png"。ない場合は "" で社名テキスト表示）
 * - description: モーダルに表示する紹介文・応援メッセージ
 * - links: モーダルに表示する外部リンク一覧（URL・種類・ラベル）
 */

const sponsors = [
  {
    name: "株式会社ワイエムジー",
    amount: 500000,
    logo: "logos/ymg.png",
    description:
      "株式会社ワイエムジーは、製造現場の自動化・省人化を支える搬送装置や産業用ロボットシステムの設計・製作・販売を行うメーカーです。お客様ごとの課題や生産環境に合わせて、オーダーメイドで最適な自動化設備を提案しています。工場内の搬送・供給・保管を自動化する設備や産業用ロボットシステムなど幅広い分野に対応し、提案・設計から製造、据付、アフターフォローまで一貫して手掛けていることが強みです。ものづくりの現場を支えながら、人手不足や生産性向上といった社会課題の解決にも貢献しています。若手社員も活躍しており、技術力と挑戦を大切にする会社です。",
    links: [
      { label: "公式HP", url: "https://kk-ymg.co.jp/", type: "website" },
      {
        label: "Instagram",
        url: "https://www.instagram.com/ymg_197704?igsh=MWZvMjZqaGZldW9zYg%3D%3D&utm_source=qr",
        type: "instagram",
      },
      {
        label: "YouTube",
        url: "https://youtube.com/channel/UCUyiD2rwoBrS7LlN55QPzTQ?si=qMKryjUQi6r1F4DB",
        type: "youtube",
      },
    ],
  },
  {
    name: "コベルコ建機株式会社",
    amount: 150000,
    logo: "logos/kobelco.png",
    description:
      "コベルコ建機株式会社は、建設機械の開発・製造・販売ならびにサービスを主要事業とする企業です。油圧ショベルやクレーンをはじめとした建設機械に加え、現場の安全性・生産性向上に貢献するDXソリューションの提供にも取り組んでいます。「ユーザー現場主義」を大切に、お客様や社会の課題解決に寄り添いながら、持続可能な未来づくりに貢献してまいります。また、豊橋技術科学大学内のリフレッシュルームのネーミングライツを取得し、「鶴新ルーム by コベルコ建機」を設置しました。次世代クレーン研究講座のロゴ「鶴新力」に由来し、学生が集い自由な発想と創造性を育む場となることを目指しています。",
    links: [
      {
        label: "公式HP",
        url: "https://www.kobelco-kenki.co.jp/",
        type: "website",
      },
    ],
  },
  {
    name: "名古屋TONKAN・ドボプロ・理系就活研究所",
    amount: 200000,
    logo: "logos/career_navigation.png",
    description:
      "建築土木、機械電気に特化したキャリア支援サービス会社。\n\n情報発信、就活マッチングイベントのみならず、「実践」をテーマに、理系学生にありとあらゆる実践の場を提供している。\n建築学生がカフェの設計施工をする「TONKAN」\n土木学生が海外でインフラ整備、国内でBBQ場をつくり実際にまちづくりをする「ドボプロ」\n機電学生が実際に現場を視察、体験し、全国にその魅力を発信する「理系就活研究所」\n\n入社という社会人の入口だけではなく、その先の人生のキャリアを考え、実践経験を提供している会社です。",
    links: [
      {
        label: "公式HP",
        url: "https://const-career.com/",
        type: "website",
      },
      {
        label: "TONKAN Instagram",
        url: "https://www.instagram.com/tonkan_nagoya/",
        type: "instagram",
      },
      {
        label: "ドボプロ Instagram",
        url: "https://www.instagram.com/dobo_pro/",
        type: "instagram",
      },
      {
        label: "理系就活研究所 TikTok",
        url: "https://www.tiktok.com/@rikei_syukatsu_kenkyujo",
        type: "tiktok",
      },
    ],
  },
  {
    name: "ロワジールホテル豊橋",
    amount: 100000,
    logo: "logos/loisir.jpg",
    description:
      "ロワジールホテル豊橋は、宿泊、レストラン、婚礼、宴会事業を展開する東三河最大級のシティホテルです。地上30階のランドマークタワーや充実したコンベンション施設を備え、ビジネスや観光の拠点として上質なホスピタリティを提供しています。「地域に寄り添うおもてなし」を大切に、心地よい空間づくりと地域の魅力発信に取り組んでいます。また、豊橋技術科学大学との連携を通じて地域社会と学術をつなぐ交流拠点としての役割も担い、学生や教職員が集い新たな活力を育む場づくりをサポートしながら、地域とともに歩む持続可能な未来づくりに貢献してまいります。",
    links: [
      {
        label: "公式HP",
        url: "https://www.loisir-toyohashi.com/",
        type: "website",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/loisir_hotel_toyohashi/?utm_source=ig_web_button_share_sheet",
        type: "instagram",
      },
    ],
  },
  {
    name: "三共食品株式会社",
    amount: 100000,
    logo: "logos/sankyo_foods.png",
    description:
      "三共食品は『食べる”わくわく”を世界中に』をコンセプトに、調味料事業と外食事業を展開する食品メーカーです。\n\n食品の美味しさを支えるエキスや乾燥野菜、業務用食品の製造・販売を通じて多くの方々の「食」のシーンに寄り添っています。\n\nまた地域に根差した企業として毎月実施しているビーチクリーン活動をはじめとする環境保全活動にも取り組み、豊橋の美しい海や自然を未来へつないでいく活動を続けています。\n\nこれからも「食」を通じて人々の笑顔を届けてまいります。",
    links: [
      { label: "公式HP", url: "https://sankyofoods.co.jp/", type: "website" },
      { label: "ECサイト", url: "https://withthree.jp/", type: "website" },
      {
        label: "公式Instagram",
        url: "https://www.instagram.com/sankyofoods/",
        type: "instagram",
      },
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp254676/outline.html",
        type: "website",
      },
    ],
  },
  {
    name: "日建学院",
    amount: 100000,
    logo: "logos/nikken.png",
    description:
      "日建学院は、建築・土木・不動産等の建設関連資格を中心に、多くの合格者を輩出してきた資格取得支援の専門スクールです。平成元年以降に誕生した1級建築士のうち54.4％のかたが日建学院の卒業生という圧倒的な合格実績を残しております。学習は学校のみならず、外出先でも受講できるWeb講座や学校の個別ブースを自由に活用できるため、一人ひとりのライフスタイルに合わせて効率よく学べます。また、経験豊富な講師が質問対応や学習アドバイスを行い、受講生の「わからない」をそのままにしない学習環境を整えています。豊橋市のある東三河地区で、建設・不動産関連の資格取得の勉強ができるのは唯一日建学院だけです。資格取得を通じて、一人でも多くの受講生の夢やキャリアの実現を支え、建設業界の未来を担う人材育成に貢献しています。",
    links: [
      {
        label: "公式HP",
        url: "https://www.ksknet.co.jp/nikken/index.aspx",
        type: "website",
      },
    ],
  },
  {
    name: "ユタカ自動車学校",
    amount: 100000,
    logo: "logos/yutaka_ds.png",
    description:
      "私たちユタカは、「優良運転者の育成を目指し、明るく、優しく、わかりやすい教習をします。」をモットーに、親切で丁寧な教習を行い、事故・違反をしない安全なドライバーを育成することで、交通事故のない、笑顔があふれる地域作りに貢献しています。普通免許はもちろん二輪免許や大型免許、中型免許から二種免許まで全ての免許が取得できる愛知県でも数少ない自動車学校です。これからも「地域の笑顔とよりよい生活のために」地域とともに歩んでまいります。",
    links: [
      {
        label: "公式HP",
        url: "https://yutaka-ds.jp/toyohashi/",
        type: "website",
      },
    ],
  },
  {
    name: "豊橋信用金庫",
    amount: 100000,
    logo: "logos/toyoshin.png",
    description:
      "夢を預かる、金融機関。\nとよしんから、この街の＼みんなにエール！／\n\n豊橋信用金庫（愛称：とよしん）は、「この街の暮らしを守る、この街の経済を強くする。」を社会的使命とする地域金融機関です。1921年の創業以来、東三河・湖西地域の企業や人々と歩んできました。\n\nそして、今。生まれ変わる地域において、\n豊橋信用金庫も、地域の企業や人々のために、新たな役割をもちたいと思います。\n「お金を預かる、金融機関。」から「夢を預かる、金融機関。」へ。\n\n私たちが預かる「お金」に込められた、お客様の「夢」。\n家を建てたい。こどもの進学に備えたい。定年後を楽しく過ごしたい。\n新しく事業を起こしたい。会社を成長させたい・・・・。\nとよしんは、ひとりひとりの夢を本気で応援し、\n前に進む勇気をもてるように「みんなにエール！」をおくる活動に取り組んでいます。",
    links: [
      { label: "公式HP", url: "https://www.toyo-shin.co.jp/", type: "website" },
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp95926/outline.html",
        type: "website",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/toyoshin_toyohashi.thinking",
        type: "instagram",
      },
    ],
  },
  {
    name: "株式会社新来島豊橋造船",
    amount: 100000,
    logo: "logos/shinkurushima.png",
    description:
      "愛知県明海町で200ｍクラスの自動車運搬船やばら積み船を建造しています。特に自動車運搬船は当社の主力船型で、国内でも数社しか建造していません。2020年の国内初LNG（液化天然ガス）燃料自動車運搬船の竣工を皮切りに、軸発電や自律航行システムなど最新技術にも果敢にチャレンジしています。\n2基の大型クレーンや全長380ｍのドライドック等の建造設備、職人達の技術と建造ノウハウを駆使し、世界の貿易を支える船を造り上げていきます。",
    links: [
      { label: "公式HP", url: "https://www.toyozo.jp/", type: "website" },
    ],
  },
  {
    name: "本多電子株式会社",
    amount: 100000,
    logo: "logos/honda_el.png",
    description:
      "知っているようで、実は知られていない。けれども、本当は身近にあふれている超音波。本多電子は国内でも有数の超音波応用機器に特化したメーカーです。1956年の創業以来、様々な分野で使われる超音波製品を生み出してきました。スマホやＰＣの製造工場で精密洗浄に使われる超音波洗浄機や、体内をリアルタイムで観察できる超音波医療診断装置（エコー）、そして、レジャー市場向け魚群探知機は国内トップシェアを獲得しています。",
    links: [
      { label: "公式HP", url: "https://www.honda-el.co.jp/", type: "website" },
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp55227/outline.html",
        type: "website",
      },
    ],
  },
  {
    name: "株式会社フルブリッジ",
    amount: 100000,
    logo: "logos/fullbridge.png",
    description:
      "豊橋市に本社を置き、販売促進や情報発信を支援する株式会社フルブリッジ。\n企画制作、映像・動画、グラフィックデザインなどを手掛けています。\n製版・印刷に加え、WEBコンテンツやIR資料の制作にも対応。\n企画からデザイン、制作、印刷までを幅広くサポートしています。\nさまざまな情報や想いを、分かりやすく魅力的に伝える企業です。",
    links: [
      { label: "公式HP", url: "https://www.suzukigroup.jp/", type: "website" },
      {
        label: "LEDレンタル",
        url: "https://www.led-rental.site/",
        type: "website",
      },
    ],
  },
  {
    name: "新東工業株式会社",
    amount: 100000,
    logo: "logos/sinto.jpg",
    description:
      "当社は、世界トップシェアの鋳造技術や表面処理技術を強みに、自動車や航空機、電子機器などのものづくりを支える東証プライム上場メーカーです。そのほかには環境分野、IoTやロボット、材料やセラミックス、EV関連分野などにも事業を拡大し、世界中の産業の発展に貢献しています。東三河から世界へ技術を発信する企業として、豊橋技術科学大学の学生の皆さまのチャレンジを応援しています。",
    links: [
      { label: "公式HP", url: "https://www.sinto.co.jp/", type: "website" },
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp2058/outline.html",
        type: "website",
      },
    ],
  },
  {
    name: "株式会社金トビ志賀",
    amount: 50000,
    logo: "logos/kintobi.png",
    description:
      "株式会社金トビ志賀は、大正6年（1917年）創業、愛知県蒲郡市を拠点に100年以上にわたり小麦と麺づくりに携わってきた食品メーカーです。小麦粉の製造から乾麺・半生麺の商品開発、製造、販売までを一貫して手がけ、愛知県産小麦「きぬあかり」を生かした商品や、名古屋きしめん、味噌煮込みうどん、そうめんなどを展開しています。地域に根ざした食文化を大切にしながら、品質・安全性の向上、大学との共同研究、海外への販路拡大にも取り組んでいます。これからも小麦のおいしさと愛知の麺文化を国内外へ発信し、粉と麺を通じて地域と社会に貢献してまいります。",
    links: [{ label: "公式HP", url: "https://kintobi.com/", type: "website" }],
  },
  {
    name: "株式会社花田工務店",
    amount: 50000,
    logo: "logos/hanada.png",
    description:
      "昭和3年に豊橋で創業した花田工務店は、まもなく100周年を迎える地域密着の総合建設会社です。木造住宅から鉄筋コンクリート造のマンション、公共事業、工場・事務所の建築まで幅広く手掛け、ハネットグループとしてお客様の財産や事業の次世代への承継をお手伝いしています。\n\n私たちは「ご縁あるすべての人のウェルネス（心身ともに健康で充実した状態）への貢献」を目指しています。過去には「快適な住環境」を追求する商品開発において、豊橋技術科学大学様と共同研究を行いました。\n\nこれからも革新的なテクノロジーを活用し、皆様の豊かな暮らしに貢献する永続企業を目指します。世界を変える新たな挑戦に向かう学生の皆様を、社員一同心より応援しております！",
    links: [
      {
        label: "公式HP",
        url: "https://www.ha-net.co.jp/hanada/",
        type: "website",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/hanada_komuten?igsh=MTU4NXRta3BleGJvcQ==",
        type: "instagram",
      },
    ],
  },
  {
    name: "株式会社原田総合計画",
    amount: 50000,
    logo: "logos/harada.png",
    description:
      "静岡県浜松市中央区上浅田に本社営業所を構えている総合建設会社です。\n愛知県東部地域、静岡県西部地域を中心に文部科学省・国土交通省中部地方整備局・浜松市・静岡県等の省庁発注の新築・改修、民間企業様の営業所の新築・改修などを請け負っています。地域のゼネコンとして、多種多様な現場に携わることで積み重ねてきた、技術と知識・経験が私たちの強みです。",
    links: [
      { label: "公式HP", url: "https://libertyone.co.jp/", type: "website" },
    ],
  },
  {
    name: "日本リーテック株式会社",
    amount: 50000,
    logo: "logos/japan_rietec.png",
    description:
      "日本リーテックは、鉄道電気設備・道路設備・屋内外電気設備・送電線設備等さまざまな電気・土木工事を通じて、安全で豊かな暮らしを支えている総合設備工事会社です。誰かの何気ない日常が、「安全」に支えられることを何よりも大事にしています。世の中の「安全」を保つための技術は常に変化し、現場は一人では決して完結しません。そのために、私たちは最先端の技術力に誇りを持ちながらも、そこに甘んじることなく、知識やスキルの向上に向けた教育体制・サポート体制の充実に力を入れています。",
    links: [
      { label: "公式HP", url: "https://www.j-rietec.co.jp/", type: "website" },
    ],
  },
  {
    name: "株式会社豊田自動織機ITソリューションズ",
    amount: 50000,
    logo: "logos/toyota_shokki_it.jpg",
    description:
      "トヨタ自動車の源流「豊田自動織機」100%出資のグループ唯一のIT企業、それが豊田自動織機ITソリューションズ（TIIS）です！\n\n私たちは単なる開発会社ではなく、豊田自動織機の全事業部をITで支え、DXを牽引する役割を担っています。情報システム部門と連携し、システムの企画・構想という「超上流工程」から深く参画。\n\n社内システムやグローバルなITインフラ構築に加え、世界トップシェアのフォークリフト等の「製品組込みソフト」、ノウハウを活かした「外販ソリューション」まで事業は多岐にわたります。\n\nモノづくり×ITの最前線で、世界にインパクトを与える挑戦をしませんか？",
    links: [
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp81816/outline.html",
        type: "website",
      },
    ],
  },
  {
    name: "松井商事株式会社（サンワ／サンワーク）",
    amount: 50000,
    logo: "logos/matsui_shoji.png",
    description:
      "松井商事株式会社は、働く人を応援する会社です。\n\n作業服・安全靴等で県下最大級・全国トップクラスの品揃えを誇り、実店舗「作業服のサンワ」4店舗を展開するほか、楽天・Yahoo!・Amazonなど複数のモールと自社サイトでECサイト「サンワーク」を運営しています。\n\n豊富なブランドを取り揃え、業種や現場環境に応じた安全性と快適性を備えた商品をご提案し、現場で最大限の力を発揮できるようサポートしています。\n\nさらに、自社でのオリジナル刺繍・プリント加工や裾直しサービスも提供しており、社名やロゴを入れたユニフォーム作成を通じて、企業のブランド価値向上にも貢献しています。働く皆様のニーズにぴったりの一着が、きっと見つかります。",
    links: [
      {
        label: "公式HP",
        url: "https://xn--3kqta352c86u.com/",
        type: "website",
      },
      {
        label: "作業服のサンワ",
        url: "https://sanwa.pro/",
        type: "website",
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/@user-qt3js9iw8l",
        type: "youtube",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/sanwa.maeda/",
        type: "instagram",
      },
    ],
  },
  {
    name: "トピー工業株式会社　豊橋製造所",
    amount: 30000,
    logo: "logos/topy.png",
    description:
      "トピー工業は豊橋市の明海町（あけみちょう）で1958年より、建設・土木や機械に使用される鉄鋼（てっこう）製品、建設機械用足回り部品、化粧品の原料、ロボットを製造しています。\n「鉄をつくり、鉄をこなす」\n二酸化炭素の排出量を抑制する電気炉で、社会活動を終えた鉄鋼製品をリサイクルすることにより持続可能な循環型社会の構築に貢献します。\nこれからも地域社会と連携し、良き企業市民として社会と人々の快適で豊かな暮らしを支えてまいります。",
    links: [
      { label: "公式HP", url: "https://www.topy.co.jp/", type: "website" },
      {
        label: "マイナビ",
        url: "https://job.mynavi.jp/28/pc/search/corp223244/outline.html",
        type: "website",
      },
    ],
  },
  {
    name: "株式会社ヒミカ",
    amount: 30000,
    logo: "logos/himika.png",
    description:
      "1969年に東三河の4市6町と4商工会議所、地元有力企業80社の出資により、地元豊橋にて設立された会社です。\n情報システムの開発・運用から、開発プログラム、サーバの保守・管理、アウトソーシングまでをトータルに提案する総合情報サービス企業として発展しました。\n規模、会社イメージともに、IT・システム業界では全国にも知られる中堅企業になるよう、さまざまな挑戦を続けていきます。",
    links: [
      { label: "公式HP", url: "https://www.himika.co.jp", type: "website" },
    ],
  },
  {
    name: "株式会社オノコム",
    amount: 30000,
    logo: "logos/onocom.png",
    description:
      "創業90年超のオノコムは、設計・施工から維持管理まで一気通貫で手がける「建築プロデュース企業」です。「たてものがかり」として、DXによるスマートな施工管理や最新技術の導入に注力しています。若手から挑戦できる風土があり、建物の完成後も生涯寄り添い続ける建築のプロを目指せる環境です。歴史だけ見れば『老舗』ですが、中身は驚くほど「ベンチャー気質」です。 最新のBIMを現場で使いこなし、デザインにはプロとしてとことんこだわる。「面白そう！」と思えば、不動産やITの領域まで境界を超え踏み込んでいく。全ては、お客様の「やりたい」に一番近くで寄り添う「たてものがかり」であり続けるため。現在、私たちは共に挑戦する仲間を募集中です。オノコム流の「境界（BORDER）を超えていく瞬間」を特等席で体感しませんか。",
    links: [
      { label: "公式HP", url: "https://www.onocom.co.jp/", type: "website" },
    ],
  },
  {
    name: "ブレイズサーフ",
    amount: 30000,
    logo: "logos/braiz_surf.png",
    description:
      "愛知県豊橋市を拠点に伊良湖エリアで活動するサーフショップ＆スクール「ブレイズサーフ」です。代表のプロサーファー萩原健太をはじめ、経験豊富なインストラクターが初心者から経験者まで優しく丁寧に指導します。キッズやファミリー、お一人様も大歓迎！多くの方が初回のレッスンでボードに立てるようになります。\n\n豊橋駅からの送迎付きプランや宿泊プランもあり、ボードやウェットスーツのレンタルも完備しているため、気軽に参加可能です。海上がりには温水シャワーもご利用いただけます。\n\n私たちと一緒に、波に乗る最高の楽しさを体験してみませんか？皆様のサーフィンデビューを全力でサポートいたします！",
    links: [
      { label: "公式HP", url: "https://braiz-surf.com/", type: "website" },
      {
        label: "Instagram",
        url: "https://www.instagram.com/braizsurf?igsh=MWowMmw0ZXhweXc1bg%3D%3D&utm_source=qr",
        type: "instagram",
      },
    ],
  },
  {
    name: "オージーケー技研株式会社",
    amount: 30000,
    logo: "logos/ogk.png",
    description:
      "オージーケー技研株式会社（OGK）は、1948年に設立した自転車部品メーカーです。現在は、自転車用チャイルドシートをはじめ、バスケットやレインカバーなど、「家族の移動」を支えるさまざまな製品を手がけています。\n\nOGKの強みは、長年培ってきた独自のプラスチック成型技術です。軽さと強度を両立した、サビにくく扱いやすい製品を生み出し、これまで世界中で700万人以上の子どもたちの安全を支えてきました。\n\n私たちは、単に移動のための製品をつくるのではなく、家族が一緒に過ごす時間に「安心」と「感動」を届ける「家族の移動創造企業」を目指しています。これからも創意工夫を重ね、皆さまの快適で楽しい自転車ライフを支えてまいります。",
    links: [{ label: "公式HP", url: "https://ogk.co.jp/", type: "website" }],
  },
  {
    name: "おにぎり　転",
    amount: 10000,
    logo: "logos/onigiri_ten.png",
    description:
      "三河産「女神のほほえみ」プレミアムを使ったまんまるおにぎりのキッチンカーです。\n具材もできるだけ地産地消にこだわってます。\n\n技科大祭を応援しています。",
    links: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/onigiri.ten?igsh=MXBocjBzbzJvbWU4cg%3D%3D&utm_source=qr",
        type: "instagram",
      },
    ],
  },
  {
    name: "株式会社トヨテック",
    amount: 10000,
    logo: "logos/toyotec.png",
    description:
      "株式会社トヨテックは、愛知県豊川市に本社を置くオプトメカトロニクスの総合メーカーです。光学（オプト）、精密機械（メカ）、電子技術（エレクトロニクス）の3つの専門技術を融合し、お客様のニーズに合わせて設計開発から製品化までを一貫して行っています。\n\n「光あふれる世の中を創ろう」を合言葉に、自動運転車やロボット、医療機器など、現代の暮らしや産業に欠かせない最先端の「レンズ」やセンサー部品を開発・製造しています。\n\n創業80年以上の歴史と確かな技術力を持ち、経済産業省の「新グローバルニッチトップ企業100選」にも選出されました。これからも「見える」を支える技術で、社会の未来づくりに貢献してまいります。",
    links: [
      { label: "公式HP", url: "https://www.toyotec.com/ja/", type: "website" },
    ],
  },
  {
    name: "Smile Cafe",
    amount: 10000,
    logo: "logos/smile_cafe.png",
    description:
      "Smile Cafe（スマイルカフェ）は、愛知県豊橋市を中心に活動しているキッチンカーです。2024年10月より、焼きたてクレープとこだわりのなめらかプリンの販売をスタートしました。\n\n「地元の皆様と笑顔で楽しくなれる場所」をコンセプトに、パティシエやレストランでの調理経験を活かした本格的なスイーツを提供しています。のんほい牛乳やめぐみ卵、豊橋紅茶など、できる限り安心・安全な地元食材を使用し、手作りにこだわっているのが特徴です。\n\nフタ付きでお土産にもぴったりなプリンや、種類豊富なクレープをご用意して皆様をお待ちしております。美味しいスイーツで、最高にSmileな時間をお楽しみください！",
    links: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/smilecafe_maru?igsh=c2hyMGMzdWRybmpk&utm_source=qr",
        type: "instagram",
      },
    ],
  },
  {
    name: "YSP豊橋",
    amount: 30000,
    logo: "logos/ysp_toyohashi.png",
    description:
      "豊橋市曙町にある、ヤマハスポーツバイクの正規ディーラーです。\nヤマハバイクの新車・中古車を取り扱っています。\n点検や修理に加え、保証・ロードサービスなども幅広く提供。\n気になるバイクを体験できる、レンタルバイクサービスも展開しています。\n購入前から購入後まで、安心のバイクライフを支えてくれるお店です。",
    links: [
      {
        label: "公式HP",
        url: "https://toyohashi.ysp-shop.com/",
        type: "website",
      },
    ],
  },
  {
    name: "株式会社トヨジン",
    amount: 10000,
    logo: "logos/toyojin.png",
    description:
      "株式会社トヨジンは、愛知県東三河を中心に40年以上の実績を持つ「ゴミのプロフェッショナル集団」です。事業所から排出される一般・産業廃棄物を安全かつ確実に収集運搬しています。\n\nまた、単なる回収にとどまらず、自社施設にて手選別・破砕・圧縮処理を行い、廃プラスチックを代替燃料として再資源化するなど、リサイクル効率を高めCO2削減に大きく貢献しています。\n\n「人の和・物の環・地域の輪」をスローガンに掲げ、周辺の清掃活動や通学路の見守りなどSDGsにも積極的に取り組んでいます。持続可能な循環型社会の構築と、地域の皆様の快適な環境づくりを全力でサポートいたします。",
    links: [
      { label: "公式HP", url: "https://www.toyojin.co.jp/", type: "website" },
    ],
  },
];

/**
 * 豊橋技術科学大学基金 寄附者ご芳名
 * 技科大祭支援募金（個人・五十音順）
 */
const individualDonorsData = {
  title: "豊橋技術科学大学基金 寄附者ご芳名",
  subtitle: "技科大祭支援募金 個人（五十音順）",
  sections: [
    {
      kana: "あ行",
      names: [
        "飯嶋 浩和 様",
        "飯島 優人 様",
        "石田 優仁 様",
        "石橋 貴英 様",
        "板津 裕一郎 様",
        "上田 敏史 様",
        "内山 直樹 様",
        "大村 浩志 様",
        "小川 裕行 様",
      ],
    },
    {
      kana: "か行",
      names: ["川石 伸太郎 様", "Nguyen Minh Ngoc 様", "黒柳 和久 様"],
    },
    {
      kana: "さ行",
      names: ["坂口 卓司 様"],
    },
    {
      kana: "た行",
      names: ["大門 裕之 様", "鳥井 章郎 様"],
    },
    {
      kana: "な行",
      names: ["中村 行宏 様", "野口 匡則 様"],
    },
    {
      kana: "は行",
      names: ["古野 志健男 様"],
    },
    {
      kana: "ま行",
      names: ["三田尾 眞司 様", "南竹 勇佑 様"],
    },
    {
      kana: "や行",
      names: ["安福 英俊 様", "山道 一樹 様", "横手 啓紀 様"],
    },
  ],
  anonymous: "掲載を希望されないご寄附者 14名",
};
