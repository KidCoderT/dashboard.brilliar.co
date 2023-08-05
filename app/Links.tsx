"use client";

import React from "react";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

const Links = ({ session }: { session: Session | null }) => {
    return !session ? (
        <div>
            <Link
                href="/login"
                type="button"
                className=" text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Login
            </Link>
            <Link
                href="/login?signup"
                type="button"
                className="text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Signup
            </Link>
        </div>
    ) : (
        <div>
            <Link
                href="/dashboard"
                type="button"
                className=" text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Dashboard
            </Link>
            <Link
                href="/account"
                type="button"
                className=" text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Account
            </Link>
        </div>
    );
};

export default Links;
