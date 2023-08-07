"use client";
import React, { useEffect, useState } from "react";
import { ServerVideo } from "../types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/app/database.types";
import AddComments from "./add-comment-modal";

const VidDetailsPage = ({
    video,
    finishVideo,
    SendVideoForRedo,
}: {
    video: ServerVideo;
    finishVideo: any;
    SendVideoForRedo: any;
}) => {
    const supabase = createClientComponentClient<Database>();
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

    function parseYouTubeLink(link: string) {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i;
        const match = link.match(regex);

        if (match) {
            const videoId = match[1];
            return {
                type: "youtube",
                link: videoId,
            };
        }

        // Return the original link if it doesn't match the expected format
        return {
            type: "invalid",
            link: link,
        };
    }

    function getEmbeddedLink(link: string): string {
        const parsedLink = parseYouTubeLink(link);
        if (parsedLink.type === "youtube") {
            return `https://www.youtube.com/embed/${parsedLink.link}`;
        } else {
            return ""; // Return an empty string for invalid links
        }
    }

    useEffect(() => {
        const channel = supabase
            .channel("update video dashboard")
            .on("postgres_changes", { event: "UPDATE", schema: "*" }, () =>
                router.refresh()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

    const finVidBtnAct = async () => {
        await finishVideo();
        router.refresh();
    };

    let bgColor = "yellow-500";

    if (video.status === "editing") {
        bgColor = "orange-500";
    } else if (video.status === "to_review") {
        bgColor = "green-500";
    }

    return (
        <div className="w-full min-h-screen px-32 py-24 flex flex-col">
            {!video.done && (
                <div
                    className={`fixed bottom-10 right-10 z-40 text-2xl px-3 py-2 rounded-lg bg-${bgColor} border-2 border-white`}
                >
                    {video.status}
                </div>
            )}
            {video.status === "to_review" && !video.done && (
                <button
                    onClick={finVidBtnAct}
                    className="fixed top-10 left-0 z-50 text-5xl px-3 py-2 rounded-e-lg bg-red-600 border-y-2 border-r-2 border-white hover:bg-red-400"
                >
                    Vid Okay? CLICK HERE TO SAY OKAY
                </button>
            )}

            {video.done && (
                <div className="fixed top-10 left-0 z-50 text-5xl px-3 py-2 rounded-e-lg bg-green-900 border-y-2 border-r-2 border-white">
                    Video is Done
                </div>
            )}
            <div className="w-full relative">
                <iframe
                    src={getEmbeddedLink(
                        video.finished_videos[video.finished_videos.length - 1]
                    )}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="h-full w-full"
                />
                <div className="bg-gradient-to-b z-40 from-transparent to-black absolute w-full h-full top-0 left-0" />
                <h1 className="text-4xl z-40 font-bold absolute bottom-10 left-5">
                    Original Video
                </h1>
            </div>

            <div className="border-gray-600 border-4 p-5 rounded-md mt-10 mb-10 relative">
                <legend className="absolute -top-5 text-2xl bg-black px-3">
                    To Edit in Style
                </legend>
                {video.style}
            </div>

            <div className="border-gray-600 border-2 p-5 rounded-md mb-10 relative flex flex-wrap">
                <legend className="absolute -top-5 text-2xl bg-black px-3">
                    Reference Videos
                </legend>
                <a
                    href={video.vid1}
                    target="_self"
                    className="p-1 rounded-md bg-blue-950 mr-2 mb-2 block"
                >
                    ~{video.vid1.split("/")[video.vid1.split("/").length - 1]}
                </a>

                {video.vid2 && video.vid2 !== "" && (
                    <a
                        href={video.vid2}
                        target="_self"
                        className="p-1 rounded-md bg-blue-950 mr-2 mb-2 block"
                    >
                        ~
                        {
                            video.vid2.split("/")[
                                video.vid2.split("/").length - 1
                            ]
                        }
                    </a>
                )}

                {video.vid3 && video.vid3 !== "" && (
                    <a
                        href={video.vid3}
                        target="_self"
                        className="p-1 rounded-md bg-blue-950 block"
                    >
                        ~
                        {
                            video.vid3.split("/")[
                                video.vid3.split("/").length - 1
                            ]
                        }
                    </a>
                )}
            </div>

            <div className="w-full flex justify-between">
                <div className="w-[48%] min-h-96 h-full border-gray-600 border-4 p-5 rounded-md relative">
                    <legend className="absolute -top-5 text-2xl bg-black px-3">
                        Reference Videos
                    </legend>
                    {video.finished_videos.length === 0 ? (
                        <h1 className="h-full w-full text-center flex items-center justify-center text-red-600">
                            *Video Still Processing <br />
                            wait until the ai returns the edited video
                        </h1>
                    ) : (
                        <>
                            <div className="flex flex-col p-3 rounded-md bg-slate-900 items-center justify-between">
                                <iframe
                                    src={getEmbeddedLink(
                                        video.finished_videos[
                                            video.finished_videos.length - 1
                                        ]
                                    )}
                                    title="YouTube video player"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    className="w-full h-48"
                                />
                                <a
                                    href={
                                        video.finished_videos[
                                            video.finished_videos.length - 1
                                        ]
                                    }
                                    className="my-2 hover:underline"
                                >
                                    Latest:{" "}
                                    {
                                        video.finished_videos[
                                            video.finished_videos.length - 1
                                        ]
                                    }
                                </a>
                            </div>
                            {video.finished_videos.length === 1 ? (
                                <div className="p-3 rounded-md mt-4 text-gray-600">
                                    *No prior version exists
                                </div>
                            ) : (
                                <>
                                    {video.finished_videos
                                        .slice(0, -1)
                                        .reverse()
                                        .map((fVideo, index) => (
                                            <a
                                                className="p-3 rounded-md  my-2 hover:underline block"
                                                href={fVideo}
                                                key={index}
                                            >
                                                Version
                                                {video.finished_videos.length -
                                                    1 -
                                                    index}
                                                : {fVideo}
                                            </a>
                                        ))}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="w-[48%] min-h-96 h-full border-gray-600 border-4 p-5 rounded-md relative">
                    <div className="absolute -top-6 flex items-center">
                        <legend className="text-2xl bg-black px-3">
                            Comments Status
                        </legend>

                        {video.status === "to_review" && !video.done ? (
                            <button
                                onClick={onOpenModal}
                                className="text-xl ml-5 bg-black hover:scale-110 hover:bg-slate-700 border-white border-2 p-1 rounded-xl"
                            >
                                ➕
                            </button>
                        ) : (
                            <div className="text-xl ml-5 bg-black border-white border-2 p-1 rounded-xl">
                                ❌
                            </div>
                        )}
                    </div>

                    {video.comment.length === 0 ? (
                        <h1 className="h-full w-full text-center flex items-center justify-center text-red-600">
                            {!video.done ? (
                                <>
                                    *You Have not created any comments. wait
                                    until video <br />
                                    is in review mode then leave your comments
                                </>
                            ) : (
                                <>*No Comments Were Made</>
                            )}
                        </h1>
                    ) : (
                        <>
                            {video.comment.map((comment, idx) => (
                                <div
                                    className={`w-full mb-3  rounded-lg p-3 ${
                                        comment.solved === true
                                            ? "line-through italic text-gray-600 bg-slate-950"
                                            : "bg-slate-700"
                                    }`}
                                    key={idx}
                                >
                                    {comment.text}
                                    {!comment.solved && " - not done"}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <AddComments func={SendVideoForRedo} onClose={onCloseModal} />
            )}
        </div>
    );
};

export default VidDetailsPage;
