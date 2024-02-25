
export const formatDate = (s: string): string => {
    const d = new Date(s)

    return `${d.getHours()}:${d.getMinutes()} ${d.toLocaleDateString()}`
}