import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';
import {DatabaseService} from '../dbservice/database.service';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService){
    }

    async login(UsernameLogin: string, Passowrd: string){
        try{
            const pool = this.databaseService.getConnection();

            const result = await pool.request()
            .input('UsernameLogin', sql.Varchar(), UsernameLogin)
            .input('PasswordLogin', sql.Varchar(), Passowrd)
            .execute('sp_Login');

            return result.recordset;
        }catch (error){
            throw new InternalServerErrorException('Error al ejecutar el SP de login');
        }
    }
}
