// server/src/models/Theme.ts
import { DataTypes, Model, type Optional, Sequelize } from 'sequelize';

interface ThemeAttributes {
    id: number;
    name: string;
    image: string;
    description?: string;
}

interface ThemeCreationAttributes extends Optional<ThemeAttributes, 'id'> {}

class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> implements ThemeAttributes {
    declare id: number;
    declare name: string;
    declare image: string;
    declare description?: string;

    public static async initialize(sequelize: Sequelize) {
        await Theme.init(
            {
                id: {
                    type: DataTypes.INTEGER({ length: 5 }),
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "Le nom ne doit pas être vide." },
                    },
                },
                image: {
                    type: DataTypes.STRING(36),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "L'image ne doit pas être vide." },
                    },
                },
                description: {
                    type: DataTypes.STRING(300),
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Theme',
                tableName: 'THEMES',
                timestamps: false,
            }
        );
    }

    public static setupAssociations() {
    }
}

export { Theme };
