import jwtDecode, { JwtPayload } from "jwt-decode";
import { get, getWithCustomBearer, post } from "./http.service";

export async function login(email: string, password: string) {
    const refreshToken =  await post("auth/login", { email, password });
    localStorage.setItem('refreshToken', refreshToken.data.refreshToken);
    fetchAccessOnExpires();
}

export async function getAccessToken() {
    const response = await get("auth/token");
    return response.data.accessToken;
}

export async function register(email: string, password: string, firstname: string, lastname: string) {
    return await post("user/register", { email, password, firstname, lastname });
}

export async function verify(token: string) {
    return await get(`user/verify/${token}`);
}

export async function resendVerification(email: string) {
    return await get(`user/resend/${email}`);
}

export async function forgotPassword(email: string) {
        return await get(`user/forgotpassword/${email}`);
}

export async function resetPassword(token: string, password: string) {
    return await post(`user/resetpassword/${token}`, { password });
}

export async function fetchAccessOnExpires() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        const accessToken = await getWithCustomBearer("auth/token", refreshToken);
        localStorage.setItem('accessToken', accessToken.data.accessToken);
        const timeLeft = timeBeforeExpiration();

        if ( timeLeft ) {
            setTimeout(fetchAccessOnExpires, timeLeft * 1000);
        }
    }
}

export async function logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
}

function timeBeforeExpiration() {
    const accessToken = localStorage.getItem('accessToken');
    if ( accessToken ) {
        const token = jwtDecode<JwtPayload>(accessToken);
        if ( token.exp ) {
            return token.exp - Math.floor(Date.now() / 1000);
        }
    }

    return null;
}