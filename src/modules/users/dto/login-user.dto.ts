import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class Login {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
