import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import {patientDto} from './dto/create-patient.dto';
import {CreatePatientInterface} from './interfaces/create-patient.interface';

@Controller('receptionist')
export class ReceptionistController {
  constructor(private readonly receptionistService: ReceptionistService) {}

  @Post('createpatient')
  async createPatientController(@Body() dto: patientDto): Promise<CreatePatientInterface> {
    return this.receptionistService.createPatientService(dto);
  }

  @Get('getPatient')
  async getPatientController(){
    return this.receptionistService.getPatientService();
  }

  @Get('getSpecialities')
  async getSpecialitiesController(){
    return this.receptionistService.getSpecialitiesService();
  }

  @Get('scheduleAppointment')
  async scheduleAppointmentController(@Query('idSpeciality') idSpeciality: number){
    return this.receptionistService.scheduleAppointment(idSpeciality);
  }
}
