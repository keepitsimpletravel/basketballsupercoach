export interface User {
    id: number;
    username: string;
    passwordHash: any;
    passwordSalt: any;
    teamname: string;
    teamSelected: number;
    photos: any;
}
