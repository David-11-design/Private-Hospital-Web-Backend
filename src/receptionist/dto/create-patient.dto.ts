import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class patientDto{
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    IdentificationNumber!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    birthDate!: Date;

    @IsString()
    @IsNotEmpty()
    @Length(1, 1, {message: "Only accept 1 caracter"})
    gender!: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;
}