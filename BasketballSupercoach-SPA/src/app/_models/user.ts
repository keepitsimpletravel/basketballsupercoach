export interface User {
    id: number;
    username: string;
    passwordHash: any;
    passwordSalt: any;
    teamname: string;
    name: string;
    email: string;
    teamSelected: number;
    photos: any;
    salarySet: number;
    active: number;
}
