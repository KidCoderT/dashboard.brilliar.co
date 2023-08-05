import { Session } from "@supabase/supabase-js";
import React from "react";

const SignOut = ({ session }: { session: Session | null }) => {
    return session ? (
        <form action="/auth/signout" method="post">
            <button
                className=" text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                type="submit"
            >
                Sign out
            </button>
        </form>
    ) : (
        <>Sign in First</>
    );
};

export default SignOut;
