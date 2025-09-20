"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TicketDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const qc = useQueryClient();
    const [msg, setMsg] = useState(null);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: async () => (await api.get(`/tickets/${id}`)).data,
    });

    const patchMut = useMutation({
        mutationFn: (payload) => api.patch(`/tickets/${id}`, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["ticket", id] });
            qc.invalidateQueries({ queryKey: ["tickets"] });
            setMsg({ ok: true, text: "Updated" });
        },
        onError: (e) => setMsg({ ok: false, text: e.response?.data?.message || "Update failed" }),
    });

    const deleteMut = useMutation({
        mutationFn: () => api.delete(`/tickets/${id}`),
        onSuccess: () => router.push("/tickets"),
        onError: (e) => setMsg({ ok: false, text: e.response?.data?.message || "Delete failed" }),
    });

    if (isLoading) return <div className="card">Loading...</div>;
    if (isError) return <div className="alert alert-err">Load failed: {error.message}</div>;

    const t = data;

    const updateField = (field, value) => patchMut.mutate({ [field]: value });
    const handleEdit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        patchMut.mutate({
            title: form.get("title"),
            description: form.get("description"),
            priority: form.get("priority"),
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-xl font-bold">Ticket Detail</h1>
                <button
                    className="btn btn-ghost"
                    onClick={() => deleteMut.mutate()}
                    disabled={deleteMut.isPending}
                >
                    {deleteMut.isPending ? "Deleting..." : "Delete"}
                </button>
            </div>

            {msg && <div className={`alert ${msg.ok ? "alert-ok" : "alert-err"}`}>{msg.text}</div>}

            <div className="grid md:grid-cols-2 gap-4">
                <form className="card space-y-3" onSubmit={handleEdit}>
                    <div>
                        <label className="label">Title</label>
                        <input name="title" className="input" defaultValue={t.title} />
                    </div>
                    <div>
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            className="input h-28"
                            defaultValue={t.description || ""}
                        />
                    </div>
                    <div>
                        <label className="label">Priority</label>
                        <select name="priority" className="select" defaultValue={t.priority}>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" disabled={patchMut.isPending} type="submit">
                        {patchMut.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </form>

                <div className="card space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-gray-600">Status</span>
                        <span className="col-span-2 font-medium">{t.status}</span>
                        <span className="text-gray-600">Created</span>
                        <span className="col-span-2">{new Date(t.createdAt).toLocaleString()}</span>
                        <span className="text-gray-600">Updated</span>
                        <span className="col-span-2">{new Date(t.updatedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="btn btn-ghost"
                            onClick={() => updateField("status", "OPEN")}
                        >
                            Open
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => updateField("status", "IN_PROGRESS")}
                        >
                            inprogess
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => updateField("status", "RESOLVED")}
                        >
                            Resolved
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
