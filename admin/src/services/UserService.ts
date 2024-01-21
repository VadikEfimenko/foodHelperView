import { AxiosResponse} from 'axios';
import $api from '../http';
import { UserDataResponse, UserResponse } from '../models/response/UserResponse';

export default class UserService {
    static async fetchAllUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return $api.post<UserResponse[]>('/getAllUsers');
    }

    static async fetchUserDataById(userId: string): Promise<AxiosResponse<UserDataResponse>> {
        return $api.post<UserDataResponse>('/getUserById', { userId });
    }
}