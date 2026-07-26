import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as sql from 'mssql';
import { DatabaseService } from '../dbservice/database.service';
import { AutoDto } from './DTOs/auto.Dto'

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    async login(dto: AutoDto) {
        try {
            const pool = await this.databaseService.getConnection();

            const result = await pool.request()
                .input('UsernameLogin', sql.NVarChar(100), dto.Username)
                .input('PasswordLogin', sql.NVarChar(100), dto.PasswordHash)
                .execute('sp_Login');

            if (result.recordset.length === 0) {
                throw new UnauthorizedException('User or password incorrect',);
            }
            console.log(result.recordset[0])
            return result.recordset[0];

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al ejecutar el SP de login');
        }
    }
}
