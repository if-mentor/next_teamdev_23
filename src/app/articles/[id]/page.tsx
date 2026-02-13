import BlogCard from "@/component/BlogCard";
import CommentForm from "@/component/CommentForm";
import CommentCard from "@/component/CommentCard";
import styles from "./page.module.css";

// ダミー記事データ
const dummyArticle = {
  title: "【衝撃】ライ麦は元々「小麦畑の雑草」だった！？驚きの出世ストーリー",
  content: `カフェやベーカリーでおなじみの「ライ麦パン」。 実はおしゃれな顔をしていますが、元々は「小麦畑に勝手に生えてくるお邪魔な雑草」だったことをご存知ですか？
  
■ 小麦のフリをして生き延びた「擬態」
かつてライ麦は、小麦畑の雑草として農家に抜かれる運命にありました。 しかし、ここで驚きの進化を遂げます。なんと、人間に抜かれないよう、葉の形や背丈、種（粒）の大きさまで「小麦そっくり」に姿を変えたのです。 これを植物学で「ヴァヴィロフ型擬態」と呼びます。小麦に似た個体だけが生き残ることで、ライ麦は小麦の収穫物にちゃっかり紛れ込むことに成功しました。

■ 寒さに負けた本家、生き残った雑草
転機は、農業が寒い北ヨーロッパへ伝わった時です。 お坊ちゃん育ちの「小麦」は寒さに耐えられず枯れてしまいましたが、雑草出身の「ライ麦」はピンピンしていました。 これを見た人間が、「小麦は無理だけど、こいつなら食える！」と気づき、主食へと大抜擢。

ドイツやロシアで黒パン（ライ麦パン）が愛されているのは、「寒すぎて小麦が育たなかったから、代わりに強かった元雑草を育てた」という歴史の名残なのです。`,
  imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1280&auto=format&fit=crop",
  authorIconUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
};

// ダミーコメントデータ
const dummyComments = [
  {
    id: 1,
    userName: "Dummy1",
    timeAgo: "1時間前",
    content: "朝食はパン派です！ライ麦パン食べたくなりました🍞",
    iconUrl: "https://placehold.jp/32x32.png", // 仮のアイコン
  },
  {
    id: 2,
    userName: "Dummy2",
    timeAgo: "2時間前",
    content: "初めて知りました。植物の生存戦略すごい。",
    iconUrl: "https://placehold.jp/32x32.png", // 仮のアイコン
  },
];

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 開発完了のためコメントアウト
  //console.log("現在の記事ID:", id);

  return (
    <main className={styles.main}>
      {/* 1. 記事詳細エリア */}
      <section className={styles.section}>
        <BlogCard
          title={dummyArticle.title}
          content={dummyArticle.content}
          imageUrl={dummyArticle.imageUrl}
          authorIconUrl={dummyArticle.authorIconUrl}
        />
      </section>

      {/* 2. コメントエリア */}
      <section className={styles.section}>
        {/* 件数表示 */}
        <h2 className={styles.commentHeading}>{dummyComments.length}件のコメント</h2>

        {/* コメント投稿フォーム */}
        <div className={styles.formWrapper}>
          <CommentForm />
        </div>

        {/* コメント一覧 */}
        <div className={styles.commentList}>
          {dummyComments.map((comment) => (
            <CommentCard
              key={comment.id}
              username={comment.userName}
              timeAgo={comment.timeAgo}
              content={comment.content}
              // 将来CommentCardが対応したらiconUrlを渡す
              // iconUrl={comment.iconUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
