// server/src/models/question.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Module } from './module';

interface QuestionAttributes {
  id: string;
  text: string;
  id_module: string;
  id_type: string;
}

class Question extends Model<QuestionAttributes> implements QuestionAttributes {
  declare id: string;
  declare text: string;
  declare id_module: string;
  declare id_type: string;

  // Association avec Module
  declare Module?: Module;

  public static async initialize(sequelize: Sequelize) {
    await Question.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_module: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
        id_type: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Question',
        tableName: 'QUESTIONS',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
    Question.belongsTo(models.Module, {
      foreignKey: 'id_module',
      as: 'Module',
    });

    // Autres associations ici si besoin
  }
}

export { Question };
