// server/src/models/Partie.ts
import { DataTypes, Model, type Optional, Sequelize } from 'sequelize';

interface PartieAttributes {
    id: string;
    score: number;
    id_user: string;
}

interface PartieCreationAttributes extends Optional<PartieAttributes, 'id'> {}

class Partie extends Model<PartieAttributes, PartieCreationAttributes> implements PartieAttributes {
    declare id: string;
    declare score: number;
    declare id_user: string;

    public static async initialize(sequelize: Sequelize) {
        await Partie.init(
            {
                id: {
                    type: DataTypes.STRING(36),
                    primaryKey: true,
                    allowNull: false,
                },
                score: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                id_user: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Partie',
                tableName: 'PARTIES',
                timestamps: false,
            }
        );
    }

    public static setupAssociations(models: any) {

        Partie.belongsTo(models.User, {
            foreignKey: 'id_user',
            targetKey: 'username',
        });

        Partie.hasMany(models.Contenir, {
            foreignKey: 'id_partie',
            as: 'contenus',
        });

        Partie.belongsToMany(models.Question, {
            through: models.Contenir,
            foreignKey: 'id_partie',
            otherKey: 'id_question',
            as: 'questionsContenues',
        });
    }

}

export { Partie };
