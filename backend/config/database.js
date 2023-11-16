import { Sequelize } from "sequelize";

const sequelize = new Sequelize('galaxy-comp', 'postgres', PASS_DATABASE, {
    host: 'localhost',
    dialect:'postgres'
});

export default sequelize;