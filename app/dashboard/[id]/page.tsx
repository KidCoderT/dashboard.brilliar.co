import { Database } from "@/app/database.types";
import {
    createServerActionClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import VidDetailsPage from "./video-detail";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) redirect("/login");

    const { data: video } = await supabase
        .from("video")
        .select("*, comment (*)")
        .filter("user_id", "eq", session.user.id)
        .match({ id })
        .single();

    if (!video) {
        notFound();
    }

    const finishVideo = async () => {
        "use server";
        const supabase = createServerActionClient<Database>({ cookies });
        const { error } = await supabase
            .from("video")
            .update({ done: true })
            .eq("id", video.id)
            .eq("user_id", session.user.id);
        if (error) throw error;
    };

    const SendVideoForRedo = async (comments: string[]) => {
        "use server";
        const supabase = createServerActionClient<Database>({ cookies });

        const { error: commentCreationError } = await supabase
            .from("comment")
            .insert(
                comments.map((comment) => ({
                    video_id: video.id,
                    text: comment,
                }))
            );
        if (commentCreationError) throw commentCreationError;

        const { error: videoUpdationError } = await supabase
            .from("video")
            .update({ status: "editing" })
            .eq("id", video.id)
            .eq("user_id", session.user.id);
        if (videoUpdationError) throw videoUpdationError;
    };

    return (
        <VidDetailsPage
            finishVideo={finishVideo}
            SendVideoForRedo={SendVideoForRedo}
            video={video}
        />
    );
}
