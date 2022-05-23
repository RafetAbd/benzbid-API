
import { BuildOptions, Model, DataTypes } from "sequelize";
import db from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 5;

// We need to declare an interface for our model that is basically what our class would be
interface UserModel extends Model {
    id?: number;
    email: string;
    password: string;
    name: string;
    imageUrl?: string;
    stripId?: string;
    correctPassword(password:string): Promise<boolean>;
    generateToken(): string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
    authenticate(email: string, password: string): Promise<string>;
    findByToken(token: string): Promise<UserModel | null>;
  }

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
const User = <UserModelStatic>db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: '/Man Emoji.png'
    },
    stripId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export { User, UserModel };

// ** instanceMethods **

// generate token, save the id in the header.
User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id },process.env.JWT_SECRET as string, {expiresIn: '1d'}
        )
}

// compare the plain version to the encrpyted version.
User.prototype.correctPassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password)
}


// ** classMethods **

User.authenticate = async function ( email: string, password: string ) {

    const user = await this.findOne({ where: { email } })
    if (!user || !(await user.correctPassword(password))) {
        throw new Error('Incorrect username/password');
    }
    return user.generateToken();
  };

  User.findByToken = async function (token) {
    try {
      const { id } = await jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      const user = User.findByPk(id)
      if (!user) {
        throw 'nooo'
      }
      return user
    } catch (ex) {
        throw new Error('bad token')
    }
  }

  // ** hooks **

  const hashPassword = async (user: UserModel) => {
    //in case the password has been created or changed, we want to encrypt it with bcrypt
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
  }
  
  User.beforeCreate(hashPassword)
  User.beforeUpdate(hashPassword)
  User.beforeBulkCreate((users) => {
      Promise.all(users.map(hashPassword))});

