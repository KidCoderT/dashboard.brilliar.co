import {
    createServerActionClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

export default async function Account() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) redirect("/login");

    const user = session.user;
    let {
        data: profile,
        error: profileError,
        status,
    } = await supabase
        .from("profiles")
        .select(`full_name, username`)
        .eq("id", user?.id)
        .single();

    if (profileError && status !== 406) {
        throw profileError;
    }

    let { data: video, error: videoFetchError } = await supabase
        .from("video")
        .select(`*, comment (*)`)
        .order("created_on", { ascending: false })
        .order("updated_at", { ascending: false })
        .order("done", { ascending: true })
        .eq("user_id", user.id);

    if (videoFetchError) {
        throw videoFetchError;
    }

    const func = async ({
        ogLink,
        comment,
        vid1,
        vid2,
        vid3,
    }: {
        ogLink: string;
        comment: string;
        vid1: string;
        vid2: string;
        vid3: string;
    }) => {
        "use server";
        const supabase = createServerActionClient<Database>({ cookies });
        const { data, error } = await supabase
            .from("video")
            .insert([
                {
                    og_link: ogLink,
                    style: comment,
                    vid1: vid1,
                    vid2: vid2,
                    vid3: vid3,
                    user_id: user.id,
                    done: false,
                },
            ])
            .single();
        if (error) throw error;
    };

    let canCreate = true;

    if (video) {
        // console.log(video.filter((vid) => vid.done === true).length);
        canCreate = video.filter((vid) => vid.done === false).length === 0;
    }

    return (
        <Dashboard
            session={session}
            profile={profile}
            user={user}
            serverVids={video || []}
            canCreate={canCreate}
            func={func}
        />
    );
}
