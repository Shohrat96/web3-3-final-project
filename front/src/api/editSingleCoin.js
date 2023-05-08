
const baseUrl = "http://localhost:3001"
export const editSingleCoin = async (payload) => {
    const { id, simpleData, detailedData } = payload
    console.log('payhload in api : ', payload)
    try {
        const res = await fetch(`${baseUrl}/admin/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                simpleData,
                detailedData
            })
        });
        const data = await res.json();
        return data

    } catch (error) {
        
    }
}