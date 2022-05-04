import jwtDecode, { JwtPayload } from "jwt-decode";
import { get, getWithAccess, getWithCustomBearer, post } from "./http.service";
import User from "../models/user.model";
import { Subject } from "rxjs";

export default class AuthService {

    private static user?: User;
    private static user$: Subject<User | undefined> = new Subject();

    static async login(email: string, password: string) {
        const refreshToken =  await post("auth/login", { email, password });
        localStorage.setItem('refreshToken', refreshToken.data.refreshToken);
        await this.fetchAccessOnExpires();
        this.refreshUser();
    }

    static async getAccessToken() {
        const response = await get("auth/token");
        return response.data.accessToken;
    }

    static async register(email: string, password: string, firstname: string, lastname: string) {
        return await post("user/register", { email, password, firstname, lastname });
    }

    static async verify(token: string) {
        return await get(`user/verify/${token}`);
    }

    static async resendVerification(email: string) {
        return await get(`user/resend/${email}`);
    }

    static async forgotPassword(email: string) {
            return await get(`user/forgotpassword/${email}`);
    }

    static async resetPassword(token: string, password: string) {
        return await post(`user/resetpassword/${token}`, { password });
    }

    static async fetchAccessOnExpires() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            const accessToken = await getWithCustomBearer("auth/token", refreshToken);
            localStorage.setItem('accessToken', accessToken.data.accessToken);
            const timeLeft = AuthService.timeBeforeExpiration();

            if ( timeLeft ) {
                setTimeout(this.fetchAccessOnExpires, timeLeft * 1000);
            }
        }
    }

    static async logout() {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        this.user = undefined;
        this.user$.next(undefined);
    }

    static timeBeforeExpiration() {
        const accessToken = localStorage.getItem('accessToken');
        if ( accessToken ) {
            const token = jwtDecode<JwtPayload>(accessToken);
            if ( token.exp ) {
                return token.exp - Math.floor(Date.now() / 1000);
            }
        }

        return null;
    }

    static async refreshUser() {
        const token = window.localStorage.getItem('accessToken')
        const timeBeforeExpiration = this.timeBeforeExpiration();
        if ( token && timeBeforeExpiration !== null) {
            if ( timeBeforeExpiration < 0) {
                await this.fetchAccessOnExpires();
            }
            getWithAccess("user/me").then(response => {
                this.user = response.data;
                this.user$.next(this.user);
            });
        }

    }

    static getCurrentUser() {
        return this.user;
    }

    static getUserObservable() {
        return this.user$.asObservable();
    }

}
