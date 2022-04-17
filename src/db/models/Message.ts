import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { UserModel } from "./User";
import db from "../db";

interface MessageModel extends Model {
    id?: number;
    content: string;
    defaultScopes: { include: { model: UserModel }[] };
}

type MessageModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MessageModel;
}

const Message = <MessageModelStatic>db.define("message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    defaultScopes: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Message;