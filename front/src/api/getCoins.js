
const baseUrl = "http://localhost:3001"
export const getCoins = async (categoryId, searchQuery) => {
    if (categoryId) {
        const res = await fetch(`${baseUrl}/categories/${categoryId}`);
        const data = await res.json();
        return data
    }
    else {
        const res = await fetch(`${baseUrl}/listOfCoins?${searchQuery}`);
        const data = await res.json();
        return data;
    }
}