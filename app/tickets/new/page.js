"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "../../../lib/schemas/ticket";
import axios from "axios";

export default function TicketCreatePage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            priority: "MEDIUM",
            status: "OPEN",
            currency: "THB",
        },
    });

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3000/tickets", data);
            alert("Ticket created successfully");
            reset();
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="max-w-lg mx-auto card space-y-4">
            <h1 className="text-xl font-bold">Create Ticket</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Title */}
                <div>
                    <label className="label">Title</label>
                    <input className="input" {...register("title")} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea className="input" rows="3" {...register("description")} />
                    {errors.description && (
                        <p className="text-red-500">{errors.description.message}</p>
                    )}
                </div>

                {/* Priority */}
                <div>
                    <label className="label">Priority</label>
                    <select className="select" {...register("priority")}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="label">Status</label>
                    <select className="select" {...register("status")}>
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="label">Price</label>
                    <input
                        type="number"
                        className="input"
                        {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                {/* Seat Number */}
                <div>
                    <label className="label">Seat Number</label>
                    <input className="input" {...register("seatNumber")} />
                    {errors.seatNumber && (
                        <p className="text-red-500">{errors.seatNumber.message}</p>
                    )}
                </div>

                {/* Currency */}
                <div>
                    <label className="label">Currency</label>
                    <input className="input" {...register("currency")} />
                    {errors.currency && <p className="text-red-500">{errors.currency.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Create Ticket"}
                </button>
            </form>
        </div>
    );
}
