// seed.ts
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity'; // Adjust the path as necessary
import { UserRoles } from './src/users/entities/enums/roles.enum'; // Adjust the path as necessary
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres', // or your database type
    host: `${process.env.DATABASE_HOST}`,
    port: parseInt(process.env.DB_PORT, 10),
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [User],
    synchronize: false,
});

const createAdmin = async () => {
    await AppDataSource.initialize();

    const password = await bcrypt.hash('1234qweR$', 10);

    const adminUser = new User();
    adminUser.name = 'Admin User';
    adminUser.username = 'admin';
    adminUser.email = 'admin@example.com';
    adminUser.password = password;
    adminUser.role = UserRoles.Admin;

    await AppDataSource.manager.save(adminUser);

    console.log('Admin user created');

    await AppDataSource.destroy();
};

createAdmin().catch((error) => console.log('Error seeding admin user:', error));
