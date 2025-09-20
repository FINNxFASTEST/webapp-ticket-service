"use client";

import { useQuery } from "@tanstack/react-query";
import api, { qs } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import TicketsFilters from "@/components/TicketsFilters";
import TicketTable from "@/components/TicketTable";
import Pagination from "@/components/Pagination";
import SkeletonRows from "@/components/SkeletonRows";

export default function TicketsPage() {
    const sp = useSearchParams();

    const params = {
        status: sp.get("status") || undefined,
        priority: sp.get("priority") || undefined,
        search: sp.get("search") || undefined,
        page: Number(sp.get("page") || 1),
        pageSize: Number(sp.get("pageSize") || 10),
        sortBy: sp.get("sortBy") || "createdAt",
        sortOrder: sp.get("sortOrder") || "desc",
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tickets", params],
        queryFn: async () => {
            try {
                const { data } = await api.get(`/tickets${qs(params)}`);
                return data; // { items, total, page, pageSize }
            } catch (err) {
                // ✅ ดัก error API แล้วโยนข้อความควบคุมเอง
                throw new Error(
                    err?.response?.data?.message || err?.message || "Failed to fetch tickets"
                );
            }
        },
        retry: 1, // กัน retry วนไม่จำเป็น
        keepPreviousData: true, // เวลาเปลี่ยนหน้าให้โชว์ข้อมูลเก่าไว้ก่อน
    });

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">🎫 Tickets</h1>
            <TicketsFilters />

            {/* 🔹 Loading skeleton */}
            {isLoading && (
                <div className="card overflow-hidden">
                    <table className="table">
                        <tbody>
                            <SkeletonRows rows={8} cols={6} />
                        </tbody>
                    </table>
                </div>
            )}

            {/* 🔹 Error state */}
            {isError && (
                <div className="alert alert-err">
                    <div className="font-semibold mb-1">⚠️ Failed to load tickets</div>
                    <div className="text-sm">{error.message}</div>
                </div>
            )}

            {/* 🔹 Empty state */}
            {!isLoading && !isError && (!data || data?.items?.length === 0) && (
                <div className="card text-gray-600">No tickets found.</div>
            )}

            {/* 🔹 Success */}
            {!isLoading && !isError && data?.items?.length > 0 && (
                <>
                    <TicketTable items={data.items} />
                    <Pagination page={data.page} pageSize={data.pageSize} total={data.total} />
                </>
            )}
        </div>
    );
}
