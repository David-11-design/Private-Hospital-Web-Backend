import { IsString, IsDate} from "class-validator";
import { Type } from 'class-transformer';

export class CreateEmployeeDto{
    @IsString()
    firstName = String;

    @IsString()
    lastName = String;

    @IsString()
    identificationNumber = String;

    @Type(() => Date)
    @IsDate()
    birthDate = Date;

    @IsString()
    gender = String;

    @IsString()
    phoneNumber = String;

    @IsString()
    email = String;

    @IsString()
    address = String;


}