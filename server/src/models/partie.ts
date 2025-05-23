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
                    type: DataTypes.UUID, // Aligné avec UUID pour cohérence
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                score: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                id_user: {
                    type: DataTypes.UUID, // Changé de STRING(40) à UUID pour correspondre à USERS.id
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
            targetKey: 'id', // Changé de 'username' à 'id'
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