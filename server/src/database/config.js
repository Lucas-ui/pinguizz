require("dotenv").config({ path: "./server/env/.env.dev" }); // adapte le chemin si nécessaire

const common = {
    dialect: process.env.MYSQL_DIALECT,
    dialectOptions: { charset: "utf8mb4" },
    logging: false,
};

module.exports = {
    dev: {
        ...common,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
    },
    test: {
        ...common,
        username: process.env.TEST_DB_USER || "test_user",
        password: process.env.TEST_DB_PASS || null,
        database: process.env.TEST_DB_NAME || "test_db",
        host: process.env.TEST_DB_HOST || "localhost",
        port: Number(process.env.TEST_DB_PORT || 3306),
    },
    prod: {
        ...common,
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASS,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOST,
        port: Number(process.env.PROD_DB_PORT || 3306),
    },
};
