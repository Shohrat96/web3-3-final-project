const baseUrl = "http://localhost:3001"
export const getQualities = async () => {
    try {
        const res = await fetch(`${baseUrl}/qualities`);
        const data = await res.json();
        return data
    } catch (error) {
        throw new Error()
    }
}