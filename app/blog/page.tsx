// ============================================
// INSTAGRAM BLOG LISTING — PREMIUM TIER ONLY
// Shows all Instagram posts as article cards.
// Style to match client branding.
// Requires: CLIENT_ID, NEXT_PUBLIC_SUPABASE_URL,
//           SUPABASE_SERVICE_ROLE_KEY env vars
// ============================================

import supabase from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", process.env.CLIENT_ID)
    .order("timestamp", { ascending: false });

  return (
    <main style={{ minHeight: "100vh", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <h1 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "2rem" }}>
          Latest Posts
        </h1>

        {!posts || posts.length === 0 ? (
          <p style={{ opacity: 0.4 }}>No posts yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {posts.map((post) => {
              const isVideo = post.media_url?.includes(".mp4");
              const imageSrc = isVideo ? post.thumbnail_url : post.media_url;

              return (
                <Link key={post.instagram_post_id} href={`/blog/${post.instagram_post_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {imageSrc && (
                    <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: "0.5rem" }}>
                      <img src={imageSrc} alt={post.caption?.slice(0, 60) || "Post"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: "1rem 0" }}>
                    <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "0.5rem" }}>
                      {new Date(post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <p style={{ fontSize: "0.875rem", opacity: 0.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.caption || "No caption"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
