const baseUrl = "http://localhost:3001"
export const getComposition = async () => {
    try {
        const res = await fetch(`${baseUrl}/composition`);
        const data = await res.json();
        return data
    } catch (error) {
        throw new Error()
    }
}