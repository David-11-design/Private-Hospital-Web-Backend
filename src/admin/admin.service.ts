import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';
import { DatabaseService } from '../dbservice/database.service';
import { CreateEmployeeDto, AsignEmployeeRoleDto } from './DTOs/index.dto';
import { CreateEmployee, AsignEmployeeRole } from './interfaces/index.interface'; 

@Injectable()
export class AdminService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    private async connection() {
        const req = await this.databaseService.getConnection()
        if (!req) {
            throw new InternalServerErrorException('Error en la conexion de la DB');
        }
        return req.request();
    }

    async createEmployee(dto: CreateEmployeeDto): Promise<CreateEmployee>{
        const req = await this.connection();

        const resp = await req
            .input('Type', sql.Int, 1)
            .input('FirstName', sql.NVarChar(100), dto.firstName)
            .input('LastName', sql.NVarChar(100), dto.lastName)
            .input('IdentificationNumber', sql.NVarChar(50), dto.identificationNumber)
            .input('BirthDate', sql.Date, dto.birthDate)
            .input('Gender', sql.Char(1), dto.gender)
            .input('PhoneNumber', sql.NVarChar(20), dto.phoneNumber)
            .input('Email', sql.NVarChar(100), dto.email)
            .input('Address', sql.NVarChar(250), dto.address)
            .output('CodResult', sql.NVarChar(3))
            .output('Message', sql.NVarChar(200))
            .execute('dbo.SP_Admin')
        
        const resul = { CodResult: resp.output.CodResult, Message: resp.output.Message }
        
        return resp.output.CodResult !== '000' ? resul : resul; 

    }

    async getEmployees(){
        const req = await this.connection();

        const resp = await req
            .input('Type', sql.Int, 2)
            .execute('dbo.SP_Admin')
        
        return resp.recordset.length > 0 ? resp.recordset : [];
    }

    async asignEmployeeRole(dto: AsignEmployeeRoleDto): Promise<AsignEmployeeRole>{
        const req = await this.connection();

        const resp = await req
            .input('Type', sql.Int, 3)
            .input('EmployeeId', sql.Int, dto.employeeId)
            .input('RoleId', sql.Int, dto.roleId)
            .input('Username', sql.NVarChar(100), dto.username)
            .input('PasswordHash', sql.NVarChar(100), dto.password)
            .input('IsActive', sql.Bit, dto.isActive)
            .output('CodResult', sql.NVarChar(3))
            .output('Message', sql.NVarChar(200))
            .execute('dbo.SP_Admin')

        const resul = { CodResult: resp.output.CodResult, Message: resp.output.Message }
        
        return resp.output.CodResult !== '000' ? resul : resul; 
    }
}
