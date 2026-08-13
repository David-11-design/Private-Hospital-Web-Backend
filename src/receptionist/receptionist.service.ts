import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { DatabaseService } from '../dbservice/database.service';
import { patientDto } from './dto/patient.dto';
import {CreatePatientInterface} from './interfaces/create-patient.interface';

@Injectable()
export class ReceptionistService {

    constructor(private readonly databaseService: DatabaseService) { }

    async createPatientService(dto: patientDto)
    : Promise<CreatePatientInterface>
    {
        try {
            const pool = await this.databaseService.getConnection();

            const response = await pool.request()
                .input('tipo', sql.Int, 1)
                .input('FirstName', sql.VarChar(100), dto.firstName)
                .input('LastName', sql.VarChar(100), dto.lastName)
                .input('IdentificationNumber', sql.VarChar(20), dto.IdentificationNumber)
                .input('BirthDate', sql.Date, dto.birthDate)
                .input('Gender', sql.Char(1), dto.gender)
                .input('PhoneNumber', sql.VarChar(20), dto.phoneNumber)
                .input('Email', sql.VarChar(150), dto.email)
                .input('Address', sql.VarChar(255), dto.address)
                .output('Cod', sql.VarChar(3))
                .output('Mensaje', sql.VarChar(150))
                .execute('dbo.sp_ReceptionistQuery');

            const result = {
                Cod: response.output.Cod,
                Mensaje: response.output.Mensaje
            };

            return response.output !== '000' ? result : result;
        }catch(error){
            console.log(error);
            return{
                Cod: '',
                Mensaje: ''
            }
        }
    }
}
