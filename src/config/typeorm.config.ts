import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'yes',
    database: 'task-manager',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
}