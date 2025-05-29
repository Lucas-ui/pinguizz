// server/src/models/contenir.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Question } from "./question"

interface ContenirAttributes {
  id_partie: string;
  id_question: string;
  id_reponse: string;
}

class Contenir extends Model<ContenirAttributes> implements ContenirAttributes {
  declare id_partie: string;
  declare id_question: string;
  declare id_reponse: string;

  public static async initialize(sequelize: Sequelize) {
    await Contenir.init(
      {
        id_partie: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        id_question: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        id_reponse: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Contenir',
        tableName: 'CONTENIR',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
    Contenir.belongsTo(models.Partie, {
      foreignKey: 'id_partie',
    });
    Contenir.belongsTo(models.Question, {
      foreignKey: 'id_question',
    });
    Contenir.belongsTo(models.Reponse, {
      foreignKey: 'id_reponse',
    });
  }
}

export { Contenir };
