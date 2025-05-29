// ./database/db.ts
import { Sequelize, type Transaction } from "sequelize";
import { initializeAllModels } from "../models";
import { logger } from "../class/logger";

class Database {
    public readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            database: process.env.MYSQL_DATABASE!,
            dialect: process.env.MYSQL_DIALECT as any,
            replication: {
                read: [
                    {
                        host: process.env.MYSQL_REPLICA1_HOST!,
                        username: process.env.MYSQL_REPLICA_USER!,
                        password: process.env.MYSQL_REPLICA_PASSWORD!,
                    },
                    {
                        host: process.env.MYSQL_REPLICA2_HOST!,
                        username: process.env.MYSQL_REPLICA_USER!,
                        password: process.env.MYSQL_REPLICA_PASSWORD!,
                    },
                ],
                write: {
                    host: process.env.MYSQL_MASTER_HOST!,
                    username: process.env.MYSQL_MASTER_USER!,
                    password: process.env.MYSQL_MASTER_PASSWORD!,
                },
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            dialectOptions: {
                charset: "utf8mb4",
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

            await this.sequelize.sync({ alter: true });

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
            logger.loggerApi.error(
                "❌ [MySQL] Transaction annulée à cause d'une erreur:",
                error
            );
            throw error;
        }
    }
}

export default new Database();
