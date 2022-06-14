export default class LeaderBoardTeam {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(matchInfo: {
    teamGoals:number,
    goalsOwn: number,
    teamName: string,
    matchResult:number
  }) {
    const { teamGoals, teamName, matchResult, goalsOwn } = matchInfo;
    this.name = teamName;
    this.totalPoints = matchResult;
    this.totalGames = 1;
    this.totalVictories = matchResult === 3 ? 1 : 0;
    this.totalDraws = matchResult === 1 ? 1 : 0;
    this.totalLosses = matchResult === 0 ? 1 : 0;
    this.goalsFavor = teamGoals;
    this.goalsOwn = goalsOwn;
    this.goalsBalance = teamGoals - goalsOwn;
    this.efficiency = parseFloat(((matchResult / 3) * 100).toFixed(2));
  }

  public addMatch(matchInfo: {
    teamGoals:number,
    goalsOwn: number,
    matchResult:number
  }) {
    const { matchResult, teamGoals, goalsOwn } = matchInfo;
    this.totalPoints += matchResult;
    this.totalGames += 1;
    this.totalVictories += matchResult === 3 ? 1 : 0;
    this.totalDraws += matchResult === 1 ? 1 : 0;
    this.totalLosses += matchResult === 0 ? 1 : 0;
    this.goalsFavor += teamGoals;
    this.goalsOwn += goalsOwn;
    this.goalsBalance += teamGoals - goalsOwn;
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}
