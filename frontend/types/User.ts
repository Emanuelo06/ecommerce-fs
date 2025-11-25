
interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    phoneNumber?: string;
    address?: string;
    role?: "costumer" | "admin";
}

export default User;