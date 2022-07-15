export const base= "http://localhost:22861/api/"

const user=localStorage.getItem("userToken")
export const config = {
    headers: { Authorization: `Bearer ${user}` }
};