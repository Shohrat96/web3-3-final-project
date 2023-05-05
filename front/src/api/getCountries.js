const baseUrl = "http://localhost:3001"
export const getCountries = async () => {
    try {
        const res = await fetch(`${baseUrl}/countries`);
        const data = await res.json();
        return data
    } catch (error) {
        throw new Error()
    }
}