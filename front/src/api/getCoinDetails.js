const baseUrl = 'http://localhost:3001'

const getCoinDetails = async (id) => {
    const res = await fetch(`${baseUrl}/coins/${id}`);
    const data = await res.json();
    return data
}
export default getCoinDetails