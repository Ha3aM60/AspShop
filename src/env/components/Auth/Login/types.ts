export interface ILogin {
    email: string | number | readonly string[] | undefined;
    password: string | number | readonly string[] | undefined;
}

export interface ILoginResult {
    token: string;
}