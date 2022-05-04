import axios from 'axios';

export async function post(path: string, body: any) {
    return await axios.post(`http://localhost:3000/${path}`, body);
}

export async function get(path: string) {
    return await axios.get(`http://localhost:3000/${path}`);
}

export async function getWithCustomBearer(path: string, bearer: string) {
    return await axios.get(`http://localhost:3000/${path}`, {
        headers: {
            Authorization: `Bearer ${bearer}`
        }
    });
}

export async function getWithAccess(path: string) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return await axios.get(`http://localhost:3000/${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    throw new Error('No access token');
}