import { z } from "zod";

export const ticketSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(255, "Title too long"),
    description: z.string().max(5000, "Description must not exceed 5000 characters").optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"]).default("OPEN"),
    price: z.number().min(1, "Price must be greater than 0"),
    seatNumber: z.string().min(1, "Seat number is required"),
    currency: z.string().default("THB"),
});
