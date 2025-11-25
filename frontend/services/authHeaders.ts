export const authHeaders = (token?: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});