export default function SkeletonRows({ rows = 8, cols = 5 }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, r) => (
                <tr key={r}>
                    {Array.from({ length: cols }).map((__, c) => (
                        <td className="td" key={c}>
                            <div className="skeleton h-4 w-24" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
