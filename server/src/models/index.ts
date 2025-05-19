import { Sequelize } from "sequelize";

import { User } from "./user";

export const models = [User];

export async function initializeAllModels(sequelize: Sequelize) {
    for (const model of models) {
        model.initialize(sequelize);
    }

    for (const model of models) {
        model.setupAssociations();
    }
}

export { User };
