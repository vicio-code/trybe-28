import Team from '../database/models/teams';

export default class TeamsService {
  public getAll = async () => {
    const teams = await Team.findAll();

    return teams;
  };

  public getById = async (id:number) => {
    const team = await Team.findByPk(id);

    return team;
  };
}
