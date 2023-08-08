"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";
import {
    Session,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import SignOut from "../SignOut";

export default function AccountForm({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const user = session?.user;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({
        username,
    }: {
        username: string | null;
        fullname: string | null;
    }) {
        try {
            setLoading(true);

            let { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="w-3/4 p-4 rounded-lg shadow-lg">
                <h1 className="text-7xl font-bold flex items-center justify-between">
                    Account:{" "}
                    <span className="text-5xl font-thin italic ">
                        ~ {session?.user.email}
                    </span>
                </h1>
                <div className="form-widget space-y-4 my-5">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullname || ""}
                            onChange={(e) => setFullname(e.target.value)}
                            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <button
                            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            onClick={() =>
                                updateProfile({
                                    fullname,
                                    username,
                                })
                            }
                            disabled={loading}
                        >
                            {loading ? "Loading ..." : "Update"}
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <SignOut session={session} />

                    <Link
                        href={"/dashboard"}
                        className="text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700    "
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
