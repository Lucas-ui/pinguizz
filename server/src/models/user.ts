// server/src/models/User.ts
import { DataTypes, Model, type Optional, Sequelize } from 'sequelize';

interface UserAttributes {
    id: string;
    username: string;
    name: string;
    firstname: string;
    password: string;
    isAdmin: boolean;
    image: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'isAdmin'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare username: string;
    declare name: string;
    declare firstname: string;
    declare password: string;
    declare isAdmin: boolean;
    declare image: string;

    public static async initialize(sequelize: Sequelize) {
        await User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                    validate: {
                        notEmpty: { msg: "L'identifiant ne doit pas être vide." },
                        len: {
                            args: [3, 40],
                            msg: "L'identifiant doit contenir entre 3 et 40 caractères.",
                        },
                    },
                },
                username: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    unique: true,
                    validate: {
                        notEmpty: { msg: "L'username ne doit pas être vide." },
                        len: {
                            args: [3, 40],
                            msg: "L'identifiant doit contenir entre 3 et 40 caractères.",
                        },
                    },
                },
                name: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "Le nom ne doit pas être vide." },
                    },
                },
                firstname: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "Le prénom ne doit pas être vide." },
                    },
                },
                password: {
                    type: DataTypes.STRING(60),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "Le mot de passe ne doit pas être vide." },
                        len: {
                            args: [10, 60],
                            msg: "Le mot de passe doit contenir entre 10 et 60 caractères.",
                        },
                    },
                },
                isAdmin: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                image: {
                    type: DataTypes.STRING(36),
                    allowNull: false,
                    validate: {
                        notEmpty: { msg: "L'image ne doit pas être vide." },
                    },
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'USERS',
                timestamps: false,
            }
        );
    }

    public static setupAssociations() {}
}

export { User };