import { Sequelize } from "sequelize";

import { User } from "./user";
import { Theme } from "./theme";
import { Module } from "./module";

export const models = [User, Theme, Module];

export async function initializeAllModels(sequelize: Sequelize) {
    for (const model of models) {
        model.initialize(sequelize);
    }

    for (const model of models) {
        model.setupAssociations();
    }
}

export { User, Theme, Module };
