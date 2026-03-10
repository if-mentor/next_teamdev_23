import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import EditForm from "./EditForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content")
    .eq("id", numericId)
    .maybeSingle();

  if (error || !post) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <section style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>記事を編集</h1>
        <EditForm id={numericId} title={post.title} content={post.content} />
      </section>
    </main>
  );
}
