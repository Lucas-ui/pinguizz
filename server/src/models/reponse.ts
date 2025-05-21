// server/src/models/reponse.ts
import { DataTypes, Model, Sequelize, type Optional } from 'sequelize';

interface ReponseAttributes {
  id: string;
  intitule: string;
}

interface ReponseCreationAttributes extends Optional<ReponseAttributes, 'id'> {}

class Reponse extends Model<ReponseAttributes, ReponseCreationAttributes> implements ReponseAttributes {
  declare id: string;
  declare intitule: string;

  public static initialize(sequelize: Sequelize) {
    Reponse.init(
      {
        id: {
          type: DataTypes.STRING(36),
          primaryKey: true,
        },
        intitule: {
          type: DataTypes.STRING(70),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Reponse',
        tableName: 'REPONSES',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
  }
}

export { Reponse };
