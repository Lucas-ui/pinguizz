import { DataTypes, Model, type Optional, Sequelize } from "sequelize";
import identifier from "../class/identifier";

interface UserAttributes {
    id: string;
    username: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface userCreationAttributes
    extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, userCreationAttributes> {
    declare id: string;
    declare username: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    get password(): string | undefined {
        return undefined;
    }

    public static async initialize(sequelize: Sequelize) {
        await User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    defaultValue: identifier.uuidV7,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: {
                        name: "unique_name",
                        msg: "Cet identifiant est déjà utilisé.",
                    },
                    validate: {
                        notNull: {
                            msg: "L'identifiant ne doit pas être nul.",
                        },
                        notEmpty: {
                            msg: "L'identifiant ne doit pas être vide.",
                        },
                        len: {
                            args: [3, 20],
                            msg: "Trop de caractères, 20 maximum.",
                        },
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: "Le mot de passe ne doit pas être nul.",
                        },
                        notEmpty: {
                            msg: "Le mot de passe ne doit pas être vide.",
                        },
                        len: {
                            args: [10, 64],
                            msg: "Le mot de passe doit contenir [10 à 64] caractères.",
                        },
                    },
                },
            },
            {
                sequelize,
                modelName: "User",
                tableName: "Users",
            }
        );
    }

    public static setupAssociations() {}
}

export { User };
