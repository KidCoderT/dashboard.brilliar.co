"use client";
import { Session, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Database } from "../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Video from "./video";
import { useRouter } from "next/navigation";
import { ServerVideo } from "./types";
import EditVideoModal from "./edit-video-modal";

const Dashboard = ({
    session,
    profile,
    user,
    serverVids,
    canCreate,
    func,
}: {
    session: Session;
    profile: {
        full_name: string | null;
        username: string | null;
    } | null;
    user: User;
    serverVids: ServerVideo[];
    canCreate: boolean;
    func: any;
}) => {
    const supabase = createClientComponentClient<Database>();
    const [posts, setPosts] = useState(serverVids);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const onOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setPosts(serverVids);
    }, [serverVids]);

    useEffect(() => {
        const channel = supabase
            .channel("update dashboard")
            .on("postgres_changes", { event: "*", schema: "*" }, () =>
                router.refresh()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

    return (
        <div className="w-full min-h-screen p-24 flex items-center flex-col">
            <div className="w-full flex justify-center flex-wrap items-center">
                <h1 className="text-6xl text-center border-b-gray-800 border-b-2 h-fit pb-8 leading-none relative">
                    Dashboard
                    <br />
                    <span className="text-xl m-0 p-0 italic text-gray-600 font-light ">
                        {profile?.full_name} | @{profile?.username} |{" "}
                        {user.email}
                    </span>
                </h1>

                {canCreate && (
                    <button
                        disabled={!canCreate}
                        onClick={onOpenModal}
                        className="text-3xl border-2 border-gray-700 p-4 h-fit rounded-lg ml-7 hover:bg-gray-900"
                    >
                        + Edit Video
                    </button>
                )}
            </div>
            {isModalOpen && (
                <EditVideoModal func={func} onClose={onCloseModal} />
            )}
            <div className="w-full flex-1 flex flex-col gap-y-3 p-6">
                {posts.map((data, idx) => (
                    <Video
                        status={data.status}
                        done={data.done}
                        video={data.og_link}
                        total_comments={data.comment.length}
                        finished_comments={
                            data.comment.filter((comment) => comment.solved)
                                .length
                        }
                        key={idx}
                        vidId={data.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
