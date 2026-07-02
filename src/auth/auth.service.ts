import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';
import {DatabaseService} from '../dbservice/database.service';
import {AutoDto} from './DTOs/auto.Dto'

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService){
    }

    async login(dto: AutoDto){
        try{
            const pool = await this.databaseService.getConnection();

            const result = await pool.request()
            .input('UsernameLogin', sql.VarChar(50), dto.Username)
            .input('PasswordLogin', sql.VarChar(50), dto.Password)
            .execute('sp_Login');

            return result.recordset;
        }catch (error){
            console.error('ERROR AL EJECUTAR SP LOGIN:', error);
            throw new InternalServerErrorException('Error al ejecutar el SP de login');
        }
    }
}
