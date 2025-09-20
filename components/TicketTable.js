import StatusBadge from "./StatusBadge";

export default function TicketTable({ items = [] }) {
    if (!items.length) {
        return <div className="card text-sm text-gray-600">No tickets found.</div>;
    }
    return (
        <div className="card overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Title</th>
                        <th className="th">Priority</th>
                        <th className="th">Status</th>
                        <th className="th">Seat</th>
                        <th className="th">Price</th>
                        <th className="th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((t) => (
                        <tr key={t.id}>
                            <td className="td">{t.title}</td>
                            <td className="td">{t.priority}</td>
                            <td className="td">
                                <StatusBadge status={t.status} />
                            </td>
                            <td className="td">{t.seatNumber ?? "-"}</td>
                            <td className="td">{t.price ?? "-"}</td>
                            <td className="td">
                                <a className="btn btn-ghost" href={`/tickets/${t.id}`}>
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
