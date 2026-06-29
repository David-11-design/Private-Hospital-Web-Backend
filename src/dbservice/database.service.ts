import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnModuleInit {

    private pool: sql.ConnectionPool;

    constructor(
        private readonly configService: ConfigService,
    ) {}

    async onModuleInit() {

        this.pool = await sql.connect({
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            server: this.configService.get<string>('DB_HOST'),
            database: this.configService.get<string>('DB_DATABASE'),
            port: Number(this.configService.get<string>('DB_PORT')),
            options: {
                encrypt: this.configService.get<string>('DB_ENCRYPT') === 'true',
                trustServerCertificate:
                    this.configService.get<string>('DB_TRUST_SERVER_CERTIFICATE') === 'true',
            },
        });

        console.log('Conexión establecida');

    }

    getConnection(): sql.ConnectionPool {
    return this.pool;
    }

}