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

  public addNewMatch = async (match: Match) => {
    const newMatch = await Match.create(match);

    return newMatch;
  };

  public finishMatch = async (id:number) => {
    const finishedMatch = await Match.findByPk(id);
    await finishedMatch?.update({ inProgress: false });
  };

  public editGoals = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
    const match = await Match.findByPk(id);
    if (match?.inProgress === true) {
      await match.update({ homeTeamGoals, awayTeamGoals });
    }
  };
}
