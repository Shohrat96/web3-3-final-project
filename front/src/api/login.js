
const baseUrl = "http://localhost:3001"
export const login = async (payload) => {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (res.status !== 200) {
            throw new Error()
        }
        const data = await res.json();
        return data
}