// ============================================
// INSTAGRAM BLOG POST — PREMIUM TIER ONLY
// Individual post page with fresh media fetch.
// Style to match client branding.
// ============================================

import supabase from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*, clients(access_token)")
    .eq("instagram_post_id", slug)
    .single();

  if (!post) notFound();

  // Fetch fresh media URL to avoid CDN expiry
  let freshMediaUrl = post.media_url;
  let freshThumbnailUrl = post.thumbnail_url;

  try {
    const token = post.clients?.access_token;
    if (token) {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${slug}?fields=media_url,thumbnail_url,media_type&access_token=${token}`
      );
      const fresh = await res.json();
      if (fresh.media_url) freshMediaUrl = fresh.media_url;
      if (fresh.thumbnail_url) freshThumbnailUrl = fresh.thumbnail_url;
    }
  } catch {
    // Fall back to stored URLs
  }

  const isVideo = post.media_url?.includes(".mp4") || freshMediaUrl?.includes(".mp4");
  const imageSrc = isVideo ? freshThumbnailUrl : freshMediaUrl;

  return (
    <main style={{ minHeight: "100vh", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <Link href="/blog" style={{ fontSize: "0.875rem", opacity: 0.5, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          ← All Posts
        </Link>

        <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "1.5rem" }}>
          {new Date(post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        {isVideo && freshMediaUrl ? (
          <div style={{ borderRadius: "0.5rem", overflow: "hidden", marginBottom: "2rem" }}>
            <video src={freshMediaUrl} poster={freshThumbnailUrl || undefined} controls style={{ width: "100%" }} />
          </div>
        ) : imageSrc ? (
          <div style={{ borderRadius: "0.5rem", overflow: "hidden", marginBottom: "2rem" }}>
            <img src={imageSrc} alt={post.caption?.slice(0, 60) || "Post"} style={{ width: "100%", objectFit: "cover" }} />
          </div>
        ) : null}

        <p style={{ fontSize: "1.125rem", lineHeight: 1.8, opacity: 0.8, whiteSpace: "pre-wrap" }}>
          {post.caption || "No caption"}
        </p>

        {post.permalink && (
          <a href={post.permalink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem", fontSize: "0.875rem", opacity: 0.6, textDecoration: "none" }}>
            View on Instagram →
          </a>
        )}
      </div>
    </main>
  );
}
