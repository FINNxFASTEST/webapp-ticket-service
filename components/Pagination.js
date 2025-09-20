"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page = 1, pageSize = 10, total = 0 }) {
    const router = useRouter();
    const sp = useSearchParams();
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const setPage = (p) => {
        const params = new URLSearchParams(sp.toString());
        params.set("page", String(p));
        params.set("pageSize", String(pageSize));
        router.push(`/tickets?${params.toString()}`);
    };
    return (
        <div className="flex items-center gap-2 mt-4">
            <button
                className="btn btn-ghost"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
            >
                Prev
            </button>
            <span className="text-sm text-gray-600">
                Page {page} / {maxPage}
            </span>
            <button
                className="btn btn-ghost"
                disabled={page >= maxPage}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </div>
    );
}
