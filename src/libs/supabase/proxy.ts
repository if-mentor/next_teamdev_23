import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Supabase環境変数が読み込めていません。 .env.local を確認してください。");
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // ユーザー取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- デバッグログ ---
  // console.log("Proxy updateSession Running");
  // console.log("Path:", request.nextUrl.pathname);
  // console.log("User:", user ? user.email : "Guest");

  const pathname = request.nextUrl.pathname;

  // 未認証制限
  const isProtected =
    pathname.startsWith("/articles/new") || /^\/articles\/[^/]+\/edit/.test(pathname) || pathname.startsWith("/users/");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 認証済み制限
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
