import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';

export interface TelegramUserAttributes {
    id?: number;
    telegram_id: number;
    telegram_name: string;
    is_bot: boolean;
    telegram_surname?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
}

export interface TelegramUserCreationAttributes extends Optional<TelegramUserAttributes, 'id'> {}

export class TelegramUser extends Model<TelegramUserAttributes, TelegramUserCreationAttributes> implements TelegramUserAttributes {
    public id!: number;
    public telegram_id!: number;
    public telegram_name!: string;
    public is_bot!: boolean;
    public telegram_surname!: string;
    public username!: string;
    public language_code!: string;
    public is_premium!: boolean;
    public added_to_attachment_menu!: boolean;
    public allows_write_to_pm!: boolean;
    public photo_url!: string;
}

TelegramUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        telegram_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
        telegram_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        telegram_surname: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        language_code: {
            type: DataTypes.STRING,
        },
        is_premium: {
            type: DataTypes.BOOLEAN,
        },
        added_to_attachment_menu: {
            type: DataTypes.BOOLEAN,
        },
        allows_write_to_pm: {
            type: DataTypes.BOOLEAN,
        },
        photo_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: 'TelegramUser',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
