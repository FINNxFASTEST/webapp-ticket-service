"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function TicketsFilters() {
    const router = useRouter();
    const sp = useSearchParams();
    const [status, setStatus] = useState(sp.get("status") || "");
    const [priority, setPriority] = useState(sp.get("priority") || "");
    const [search, setSearch] = useState(sp.get("search") || "");
    const [sortBy, setSortBy] = useState(sp.get("sortBy") || "createdAt");
    const [sortOrder, setSortOrder] = useState(sp.get("sortOrder") || "desc");

    useEffect(() => {
        setStatus(sp.get("status") || "");
        setPriority(sp.get("priority") || "");
        setSearch(sp.get("search") || "");
        setSortBy(sp.get("sortBy") || "createdAt");
        setSortOrder(sp.get("sortOrder") || "desc");
    }, [sp]);

    const apply = () => {
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        if (priority) params.set("priority", priority);
        if (search) params.set("search", search);
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
        params.set("page", "1");
        router.push(`/tickets?${params.toString()}`);
    };

    const clear = () => router.push("/tickets");

    return (
        <div className="card flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
                <label className="label">Search</label>
                <input
                    className="input"
                    placeholder="title / description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div>
                <label className="label">Status</label>
                <select
                    className="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                </select>
            </div>
            <div>
                <label className="label">Priority</label>
                <select
                    className="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>
            <div>
                <label className="label">Sort by</label>
                <select
                    className="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="createdAt">createdAt</option>
                    <option value="updatedAt">updatedAt</option>
                    <option value="priority">priority</option>
                    <option value="status">status</option>
                    <option value="title">title</option>
                </select>
            </div>
            <div>
                <label className="label">Order</label>
                <select
                    className="select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">desc</option>
                    <option value="asc">asc</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button className="btn btn-primary" onClick={apply}>
                    Apply
                </button>
                <button className="btn btn-ghost" onClick={clear}>
                    Clear
                </button>
            </div>
        </div>
    );
}
