"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = ({ isLoginPage }: { isLoginPage: boolean }) => {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((state, _) => {
            if (state === "SIGNED_IN" || state === "SIGNED_OUT") {
                router.push("/");
                router.refresh();
            }
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
                    view={isLoginPage ? "sign_up" : "sign_in"}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    showLinks={true}
                    providers={[]}
                    redirectTo={`${location.origin}/auth/callback`}
                    socialLayout="horizontal"
                />
            </div>
        </div>
    );
};

export default Login;
