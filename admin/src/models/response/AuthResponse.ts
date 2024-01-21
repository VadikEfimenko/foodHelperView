interface IDoctor {
    login: string;
    id: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    doctor: IDoctor;
}