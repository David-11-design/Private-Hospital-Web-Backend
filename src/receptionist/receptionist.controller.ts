import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import {patientDto} from './dto/patient.dto';
import {CreatePatientInterface} from './interfaces/create-patient.interface';

@Controller('receptionist')
export class ReceptionistController {
  constructor(private readonly receptionistService: ReceptionistService) {}

  @Post('createpatient')
  async createPatientController(@Body() dto: patientDto): Promise<CreatePatientInterface> {
    return this.receptionistService.createPatientService(dto);
  }
}
