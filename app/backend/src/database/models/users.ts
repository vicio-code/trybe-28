import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
  public id!:number;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
