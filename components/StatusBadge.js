export default function StatusBadge({ status }) {
    const styles = {
        OPEN: "border-blue-300 text-blue-700 bg-blue-50",
        IN_PROGRESS: "border-amber-300 text-amber-700 bg-amber-50",
        RESOLVED: "border-emerald-300 text-emerald-700 bg-emerald-50",
    };
    return (
        <span className={`badge ${styles[status] || "border-gray-300 text-gray-700 bg-gray-50"}`}>
            {status}
        </span>
    );
}
