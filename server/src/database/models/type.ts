// server/src/models/type.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

interface TypeAttributes {
  id: number;
  name: string;
}

class Type extends Model<TypeAttributes> implements TypeAttributes {
  declare id: number;
  declare name: string;

  public static initialize(sequelize: Sequelize) {
    Type.init(
      {
        id: {
          type: DataTypes.INTEGER,
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
      },
      {
        sequelize,
        modelName: 'Type',
        tableName: 'TYPES',
        timestamps: false,
      }
    );
  }

  public static setupAssociations(models: any) {
  }
}

export { Type };
