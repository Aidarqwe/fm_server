import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect';

export interface UserAttributes {
    id: number;
    account_id: number;
    name: string;
    gender: string;
    birthdate: Date;
    city: string;
    search_goal: string;
    photo_path: string;
    selfie_path: string;
    subscription_links: boolean[];
}
export type UserCreationAttributes = Omit<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public account_id!: number;
    public name!: string;
    public gender!: string;
    public birthdate!: Date;
    public city!: string;
    public search_goal!: string;
    public photo_path!: string;
    public selfie_path!: string;
    public subscription_links!: boolean[];
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            references: {
                model: 'TelegramUser',
                key: 'telegram_id',
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        search_goal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        selfie_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subscription_links: {
            type: DataTypes.ARRAY(DataTypes.BOOLEAN),
            allowNull: false,
            defaultValue: [false, false],
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
