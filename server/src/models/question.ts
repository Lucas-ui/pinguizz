// server/src/models/question.ts
import { DataTypes, Model, Sequelize, type Optional } from 'sequelize';

interface QuestionAttributes {
  id: string;
  text: string;
  id_module: string;
  id_type: number;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  declare id: string;
  declare text: string;
  declare id_module: string;
  declare id_type: number;

  public static initialize(sequelize: Sequelize) {
    Question.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        text: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        id_module: {
          type: DataTypes.STRING(36),
          allowNull: false,
        },
        id_type: {
          type: DataTypes.INTEGER,
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
      targetKey: 'id',
    });

    Question.belongsTo(models.Type, {
      foreignKey: 'id_type',
      targetKey: 'id',
    });

    Question.hasMany(models.Posseder, {
      foreignKey: 'id_question',
      as: 'posseder',
    });

    Question.belongsToMany(models.Reponse, {
      through: models.Posseder,
      foreignKey: 'id_question',
      otherKey: 'id_reponse',
      as: 'reponsesPossedees',
    });

    Question.belongsToMany(models.Partie, {
      through: models.Contenir,
      foreignKey: 'id_question',
      otherKey: 'id_partie',
      as: 'partiesContenantes',
    });
  }

}

export { Question };
