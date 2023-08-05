import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Database } from "./app/database.types";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();

    // if (session && req.nextUrl.pathname === "/login") {
    //     return NextResponse.redirect(new URL("/dashboard", req.url));
    // }

    // if (!session && req.nextUrl.pathname !== "/") {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    return res;
}
