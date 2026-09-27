import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as sql from 'mssql';
import { DatabaseService } from '../dbservice/database.service';
import { AutoDto } from './DTOs/auto.Dto'
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    private async connection() {
        const req = await this.databaseService.getConnection()
        if (!req) {
            throw new InternalServerErrorException('Error en la conexion de la DB');
        }
        return req.request();
    }

    async login(dto: AutoDto) {
        const req = await this.connection();

        const resp = await req
            .input('UsernameLogin', sql.NVarChar(100), dto.Username)
            .input('PasswordLogin', sql.NVarChar(100), dto.PasswordHash)
            .execute('sp_Login');
        
        const resul: unknown = (!resp.recordset) ?
            (() => { throw new InternalServerErrorException('Auth sp query execution failed'); })() : resp.recordset.length === 0 ?
            (() => { throw new UnauthorizedException('Invalid username or password'); })() : resp.recordset[0];

        return resul;
    }
}
