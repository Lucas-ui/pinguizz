// server/src/models/posseder.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Question } from "./question"

interface PossederAttributes {
  id_question: string;
  id_reponse: string;
  isCorrect: boolean;
}

class Posseder extends Model<PossederAttributes> implements PossederAttributes {
  declare id_question: string;
  declare id_reponse: string;
  declare isCorrect: boolean;

  public static async initialize(sequelize: Sequelize) {
    await Posseder.init(
      {
        id_question: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        id_reponse: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        isCorrect: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Posseder',
        tableName: 'POSSEDER',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
    Posseder.belongsTo(models.Question, {
      foreignKey: 'id_question',
    });
    Posseder.belongsTo(models.Reponse, {
      foreignKey: 'id_reponse',
      as: 'reponse',
    });
  }
}

export { Posseder };
