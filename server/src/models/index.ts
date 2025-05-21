import { Sequelize } from "sequelize";

import { User } from "./user";
import { Theme } from "./theme";
import { Module } from "./module";
import { Partie } from "./partie";
import { Question } from "./question";
import { Reponse } from "./reponse";
import { Type } from "./type";

export const models = [User, Theme, Module, Partie, Question, Reponse, Type];

const modelMap = {
        User,
        Theme,
        Module,
        Partie,
        Question,
        Reponse,
        Type
    };

export async function initializeAllModels(sequelize: Sequelize) {
    for (const model of models) {
        model.initialize(sequelize);
    }

    for (const model of models) {
        model.setupAssociations(modelMap);
    }
}

export { User, Theme, Module, Partie, Question, Reponse, Type };
