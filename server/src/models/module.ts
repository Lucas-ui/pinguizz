// server/src/models/module.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Theme } from './theme';

interface ModuleAttributes {
  id: string;
  name: string;
  id_theme: string;
}

class Module extends Model<ModuleAttributes> implements ModuleAttributes {
  declare id: string;
  declare name: string;
  declare id_theme: string;

  // Association avec Theme
  declare Theme?: Theme;

  public static async initialize(sequelize: Sequelize) {
    await Module.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_theme: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Module',
        tableName: 'MODULES',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
    Module.belongsTo(models.Theme, {
      foreignKey: 'id_theme',
      as: 'Theme',
    });
  }
}

export { Module };
