import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
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
