import { Model, DataTypes, BuildOptions } from "sequelize";
import db from "../db"

interface BidModel extends Model {
    id?: number;
    amount: number;
}

type BidModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BidModel;
}

const Bid  = <BidModelStatic>db.define("bid", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Bid;