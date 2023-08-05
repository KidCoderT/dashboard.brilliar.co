import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Login from "./Login";

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) redirect("/");

    return <Login isLoginPage={"signup" in searchParams} />;
}
