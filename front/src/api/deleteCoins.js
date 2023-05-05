
const baseUrl = "http://localhost:3001"
export const deleteCoin = async (coinId) => {
    try {
        const res = await fetch(`${baseUrl}/coin/${coinId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await res.json();
        return data

    } catch (error) {
        console.log('error in delete: ', error)
    }
}