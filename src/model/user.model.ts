export class RegisterUserRequest {
    username: string;
    password: string;
    name: string;
}

export class UserResponse {
    username: string;
    name: string;
    token?: string | null;
}

export class LoginUaserRequest {
    username: string;
    password: string;
}