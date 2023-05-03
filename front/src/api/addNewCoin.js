
const baseUrl = "http://localhost:3001"
export const addNewCoin = async (payload) => {
    try {
        const res = await fetch(`${baseUrl}/admin/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data

    } catch (error) {
        
    }
}