interface NewsDateProps {
    date?: string
}

export default function NewsDate({ date }: NewsDateProps) {
    if (!date) return null
    return (
        <span className="text-gray-500 text-sm">
            {new Date(date).toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
        </span>
    )
}