import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Links from "./Links";
import { Database } from "./database.types";
import { cookies } from "next/headers";
import SignOut from "./SignOut";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
            <div className="text-center">
                <h1 className="text-7xl mb-4">Meet Brilliar</h1>
                <h3 className="text-4xl font-light">
                    The Video Editor and Creator
                    <br /> who gets your Vision & Style
                </h3>
            </div>

            <div className="text-center">
                <Links session={session} />
                <SignOut session={session} />
            </div>
        </main>
    );
}
