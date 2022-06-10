import Match from '../database/models/matches';
import Team from '../database/models/teams';

export default class MatchesService {
  public getAll = async () => {
    const queryOptions = {
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] };
    const matches = await Match.findAll(queryOptions);

    return matches;
  };

  public getMatchByStatus = async (status: boolean) => {
    const queryOptions = {
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: status } };
    const matches = await Match.findAll(queryOptions);

    return matches;
  };
}
