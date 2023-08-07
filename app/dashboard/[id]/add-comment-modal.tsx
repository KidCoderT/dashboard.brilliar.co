"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddComments = ({ onClose, func }: { onClose: any; func: any }) => {
    let [comments, setComments] = useState<string[]>([]);
    let [newComment, setNewComment] = useState<string>("");
    let router = useRouter();

    function addComment() {
        setComments([...comments, newComment]);
        setNewComment("");
    }

    const formAction = async (formData: FormData) => {
        if (comments.length === 0) {
            alert("Atleast add one comment");
        } else {
            await func(comments);
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
                    Comment on Video
                </h2>

                {comments.map((comment, idx) => (
                    <p key={idx}> - {comment}</p>
                ))}

                <div className="w-full max-w-sm mb-4">
                    <div className="flex items-center border-b border-blue-500 py-2">
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            value={newComment || ""}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Comment"
                        />
                        <button
                            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button"
                            onClick={addComment}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white focus:outline-none focus:ring-4 font-medium text-lg rounded-lg px-5 py-2.5 mr-3 mb-2 bg-green-800 hover:bg-green-700 focus:ring-gray-700 border-gray-700"
                >
                    Submit
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

export default AddComments;
