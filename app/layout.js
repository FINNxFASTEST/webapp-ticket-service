import "./globals.css";
import Providers from "./providers";

export const metadata = {
    title: "Tickets Dashboard",
    description: "Frontend for NestJS Tickets API",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav className="border-b bg-white">
                    <div className="container py-3 flex gap-4">
                        <a href="/" className="font-semibold">
                            🏠 Home
                        </a>
                        <a href="/tickets" className="text-blue-700">
                            Tickets
                        </a>
                        <a href="/tickets/new" className="text-blue-700">
                            Create Ticket
                        </a>
                    </div>
                </nav>
                <Providers>
                    <main className="w-full min-h-screen px-5 py-5">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
