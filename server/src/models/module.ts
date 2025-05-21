// server/src/models/module.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Theme } from "./theme";

interface ModuleAttributes {
  id: string;
  name: string;
  id_theme: number;
  image: string;
  description?: string;
}

class Module extends Model<ModuleAttributes> implements ModuleAttributes {
  declare id: string;
  declare name: string;
  declare id_theme: number;
  declare image: string;
  declare description?: string;

  public static async initialize(sequelize: Sequelize) {
    Module.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            notEmpty: { msg: "Le nom ne doit pas être vide." },
          },
        },
        id_theme: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Module",
        tableName: "MODULES",
        timestamps: false,
      }
    );
  }

  public static setupAssociations() {
    Module.belongsTo(Theme, {
      foreignKey: "id_theme",
      as: "theme",
    });
  }
}

export { Module };
