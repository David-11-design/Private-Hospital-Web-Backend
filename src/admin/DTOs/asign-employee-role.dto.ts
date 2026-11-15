import { IsString, IsNumber, IsBoolean} from "class-validator";

export class AsignEmployeeRoleDto{
    @IsNumber()
    employeeId = Number;
    
    @IsNumber()
    roleId = Number;
    
    @IsString()
    username = String;
    
    @IsString()
    password = String;
    
    @IsBoolean()
    isActive = Boolean;
}