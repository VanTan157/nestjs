import { IsOptional } from "class-validator";


export class UpdateUserDto  {
    @IsOptional()
    email: string

    @IsOptional()
    password: string

    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;

    @IsOptional()
    role: string;
}
