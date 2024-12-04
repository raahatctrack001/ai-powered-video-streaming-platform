"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="mb-4 text-lg">{error.message}</p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Try Again
            </button>
        </div>
    );
}
