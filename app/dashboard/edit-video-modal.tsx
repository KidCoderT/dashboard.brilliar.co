"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface YouTubeLink {
    type: "youtube";
    link: string;
}

interface InvalidLink {
    type: "invalid";
    link: string;
}

type ParsedLink = YouTubeLink | InvalidLink;

const EditVideoModal = ({ onClose, func }: { onClose: any; func: any }) => {
    let [ogLink, setOgLink] = useState("");
    let [comment, setComment] = useState("");
    let [vid1, setVid1] = useState("");
    let [vid2, setVid2] = useState("");
    let [vid3, setVid3] = useState("");
    let router = useRouter();

    function checkYouTubeVideoLink(videoUrl: string) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", videoUrl);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Video link is valid
                        resolve(true);
                    } else {
                        // Video link is invalid
                        resolve(false);
                    }
                }
            };
            xhr.onerror = function () {
                reject(new Error("Error checking YouTube video link"));
            };

            xhr.send();
        });
    }

    function getEmbeddedLink(link: string): string {
        const parsedLink = link.split("/").reverse()[0].split("=").reverse()[0];

        checkYouTubeVideoLink(link).then((isValid) => {
            if (isValid) {
                return `https://www.youtube.com/embed/${parsedLink}`;
            } else {
                return "";
            }
        });

        return "";
    }

    const formAction = async (formData: FormData) => {
        if (getEmbeddedLink(ogLink) === "") {
            alert("The unlisted video link is incorrect");
        } else if (getEmbeddedLink(vid1) === "") {
            alert("The embed for video 1 link is incorrect");
        } else if (vid2 !== "" && getEmbeddedLink(vid2) === "") {
            alert("The embed for video 2 link is incorrect");
        } else if (vid3 !== "" && getEmbeddedLink(vid3) === "") {
            alert("The embed for video 3 link is incorrect");
        } else {
            await func({
                ogLink: ogLink,
                comment: comment,
                vid1: vid1,
                vid2: vid2,
                vid3: vid3,
            });
            onClose();
            router.refresh();
        }
    };

    return (
        <div className="absolute top-0 z-50 left-0 w-full min-h-screen h-fit flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll py-16">
            <form
                className="bg-slate-800 p-8 rounded-lg w-96"
                action={formAction}
            >
                <h2 className="text-2xl font-semibold mb-4 border-b-2 border-slate-600 pb-2">
                    Edit New Video
                </h2>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Unlisted YT Vid Link:
                    </label>
                    <input
                        type="text"
                        value={ogLink || ""}
                        required={true}
                        onChange={(e) => setOgLink(e.target.value)}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {getEmbeddedLink(ogLink) !== "" ? (
                    <iframe
                        src={getEmbeddedLink(ogLink)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="w-full my-3"
                    ></iframe>
                ) : (
                    <h1 className="w-full my-3 text-red-600">
                        *Vid Link Incorrect
                    </h1>
                )}

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-white">
                        Example Videos to edit Like (Atleast 1):
                    </label>
                    <input
                        type="text"
                        value={vid1}
                        required={true}
                        onChange={(e) => setVid1(e.target.value)}
                        className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    />

                    {getEmbeddedLink(vid1) === "" && (
                        <h1 className="w-full my-3 text-red-600">
                            *Vid Link Incorrect
                        </h1>
                    )}

                    {vid1 !== "" && getEmbeddedLink(vid1) && (
                        <>
                            <input
                                type="text"
                                value={vid2}
                                onChange={(e) => setVid2(e.target.value)}
                                className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                            {getEmbeddedLink(vid2) === "" && (
                                <h1
                                    className={`w-full my-3 text-${
                                        vid3 !== "" ? "red" : "gray"
                                    }-600`}
                                >
                                    {vid2 !== ""
                                        ? "*Vid Link Incorrect"
                                        : "*if you want one more reference please add it here"}
                                </h1>
                            )}
                        </>
                    )}

                    {vid2 !== "" && getEmbeddedLink(vid2) !== "" && (
                        <>
                            <input
                                type="text"
                                value={vid3}
                                onChange={(e) => setVid3(e.target.value)}
                                className="mt-2 border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            />
                            {getEmbeddedLink(vid3) === "" && (
                                <h1
                                    className={`w-full my-3 text-${
                                        vid3 !== "" ? "red" : "gray"
                                    }-600`}
                                >
                                    {vid3 !== ""
                                        ? "*Vid Link Incorrect"
                                        : "*if you want one last reference please add it here"}
                                </h1>
                            )}
                        </>
                    )}
                </div>

                <textarea
                    value={comment || ""}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Any specific style that you imagine write it here..."
                    required={true}
                    className="border sm:text-sm rounded-lg mb-4 h-48 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="text-white focus:outline-none focus:ring-4 font-medium text-lg rounded-lg px-5 py-2.5 mr-3 mb-2 bg-green-800 hover:bg-green-700 focus:ring-gray-700 border-gray-700"
                >
                    Create
                </button>
                <button
                    onClick={onClose}
                    className="text-white focus:outline-none focus:ring-4 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 bg-gray-900 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default EditVideoModal;
