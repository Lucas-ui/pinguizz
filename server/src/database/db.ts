import { Sequelize, Transaction } from "sequelize";
import { initializeAllModels } from "./models"; // Ton index.ts de modèles
import { logger } from "../class/logger";

class Database {
    public readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: process.env.MYSQL_DIALECT as any,
            replication: {
                write: {
                    host: process.env.MYSQL_MASTER_HOST!,
                    username: process.env.MYSQL_MASTER_USER!,
                    password: process.env.MYSQL_MASTER_PASSWORD!,
                    database: process.env.MYSQL_DATABASE!,
                },
                read: [
                    {
                        host: process.env.MYSQL_SLAVE_HOST!,
                        username: process.env.MYSQL_SLAVE_USER!,
                        password: process.env.MYSQL_SLAVE_PASSWORD!,
                        database: process.env.MYSQL_DATABASE!,
                    },
                ],
            },
            dialectOptions: { charset: "utf8mb4" },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            benchmark: true,
            logging: (msg, timing) => {
                logger.loggerSequelize.info({
                    message: msg,
                    executionTime: timing ? `${timing}ms` : "unknown",
                });
            },
        });
    }

    public async connect() {
        try {
            await initializeAllModels(this.sequelize);
            await this.sequelize.authenticate();

            logger.loggerApi.info(
                `✅ [MySQL] Connecté à ${process.env.MYSQL_DATABASE}`
            );
        } catch (error) {
            logger.loggerApi.error("❌ [MySQL] Erreur de connexion:", error);
            throw error;
        }
    }

    public async close() {
        await this.sequelize.close();
        logger.loggerSequelize.info("🛑 [MySQL] Connexion fermée");
    }

    public async withTransaction<T>(
        callback: (sequelize: Sequelize, transaction: Transaction) => Promise<T>
    ): Promise<T> {
        const t = await this.sequelize.transaction();

        logger.loggerApi.info("📦 [MySQL] Transaction démarrée");

        try {
            const result = await callback(this.sequelize, t);
            await t.commit();
            logger.loggerApi.info("✅ [MySQL] Transaction validée");
            return result;
        } catch (error) {
            await t.rollback();
            logger.loggerApi.error("❌ [MySQL] Transaction annulée:", error);
            throw error;
        }
    }
}

export default new Database();
