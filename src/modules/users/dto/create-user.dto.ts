import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;

    @IsOptional()
    role: string;
}
