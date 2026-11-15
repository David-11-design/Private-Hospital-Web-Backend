import { Body ,Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateEmployeeDto } from './DTOs/index.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create-employee')
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return await this.adminService.createEmployee(dto);
  }

  @Get('get-employees')
  async getEmployees() {
    return await this.adminService.getEmployees();
  }
}
