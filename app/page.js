export default function Home() {
    return (
        <div className="flex justify-center">
            <div className="card w-100">
                <h1 className="text-xl font-bold mb-2">🎫 Tickets Frontend</h1>
                <p className="text-sm text-gray-600">
                    Go to{" "}
                    <a className="text-blue-700 underline" href="/tickets">
                        Tickets
                    </a>{" "}
                    to view the list.
                </p>
            </div>
        </div>
    );
}
