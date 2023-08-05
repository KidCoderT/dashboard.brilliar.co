"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((state, _) => {
            if (state === "SIGNED_IN") router.push("/");
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    return (
        <div className="min-h-screen w-full py-12 px-6 md:p-24 flex justify-center items-center">
            <div className="w-full md:w-96 h-fit">
                <Auth
                    supabaseClient={supabase}
                    view={"signup" in searchParams ? "sign_up" : "sign_in"}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    showLinks={true}
                    providers={[]}
                    redirectTo="http://localhost:3000/auth/callback"
                    socialLayout="horizontal"
                />
            </div>
        </div>
    );
}
