import { Sequelize } from 'sequelize'

const
    db = 'taskdb',
    username = 'root',
    password = '',
    host = 'localhost';

export const sequelize = new Sequelize(
    db,
    username,
    password,
    {
        host,
        port: 3306,
        dialect: "mysql",
    }
);

sequelize.sync();