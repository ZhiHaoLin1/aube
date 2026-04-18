// ============================================
// INSTAGRAM MODULE — PREMIUM TIER ONLY
// Copy this file exactly — never modify.
// Uses CLIENT_ID env var to filter posts
// for this specific client only.
// ============================================

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function getPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", process.env.CLIENT_ID)
    .order("timestamp", { ascending: false });
  return data || [];
}

export async function getPost(instagram_post_id) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", process.env.CLIENT_ID)
    .eq("instagram_post_id", instagram_post_id)
    .single();
  return data;
}
