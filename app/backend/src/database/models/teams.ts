import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public teamName!: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
