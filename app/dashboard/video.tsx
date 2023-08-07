import React from "react";
import { Database } from "../database.types";
import { redirect, useRouter } from "next/navigation";

const Video = ({
    vidId,
    video,
    status,
    finished_comments,
    total_comments,
    done = false,
}: {
    vidId: string;
    status: Database["public"]["Enums"]["status_enum"];
    video: string;
    finished_comments: number;
    total_comments: number;
    done: boolean;
}) => {
    let bgColor = "yellow-500";
    let router = useRouter();

    if (status === "editing") {
        bgColor = "orange-500";
    } else if (status === "to_review") {
        bgColor = "green-500";
    }

    if (status === "to_review") {
        if (finished_comments !== total_comments) {
            throw new Error();
        }
    }

    return !done ? (
        <div
            className="w-full p-4 bg-slate-900 hover:bg-slate-800 rounded-md flex justify-between"
            onClick={() => router.push(`/dashboard/${vidId}`)}
        >
            <span className="hidden bg-orange-500"></span>
            <span className="hidden bg-green-500"></span>
            <span className="hidden bg-yellow-500"></span>
            <a
                href={video}
                className="italic hover:underline hover:decoration-double"
                target="_blank"
            >
                {video.split("=")[1]}
            </a>

            <span>
                <span>
                    STATUS:{" "}
                    <span
                        className={`px-2 py-1 bg-${bgColor} rounded-md border-none`}
                    >
                        {status}
                    </span>
                </span>

                <span className="ml-4">
                    COMMENTS:{" "}
                    <span className="px-2 py-1 bg-gray-700 rounded-md border-none">
                        {finished_comments} / {total_comments}
                    </span>
                </span>
            </span>
        </div>
    ) : (
        <div
            className="w-full p-4 opacity-10 hover:opacity-80 bg-slate-950 rounded-md flex justify-between ease-in-out transition-all"
            onClick={() => router.push(`/dashboard/${vidId}`)}
        >
            <a
                href={video}
                className="italic hover:underline hover:decoration-double"
                target="_blank"
            >
                {video.split("=")[1]}
            </a>

            <span>
                <span>
                    STATUS:{" "}
                    <span
                        className={`px-2 py-1 bg-green-900 rounded-md border-none`}
                    >
                        DONE
                    </span>
                </span>

                <span className="ml-4">
                    COMMENTS:{" "}
                    <span className="px-2 py-1 bg-gray-700 rounded-md border-none">
                        {finished_comments} / {total_comments}
                    </span>
                </span>
            </span>
        </div>
    );
};

export default Video;
