import Match from '../database/models/matches';
import MatchesService from '../services/matches.service';
import LeaderBoardTeam from './LeaderBoardTeam';

interface LeaderboardI {
  [key:string]: LeaderBoardTeam
}

export default class Leaderboard {
  matchesService: MatchesService;
  leaderboard: LeaderboardI;
  type: string;

  private constructor(type: string) {
    this.matchesService = new MatchesService();
    this.leaderboard = {};
    this.type = type;
  }

  private static get = async (type:string) => {
    const leaderboard = new Leaderboard(type);
    await leaderboard.initLeaderboard();
    return leaderboard.getLeaderBoard();
  };

  static leaderboardFactory = async (type: string) => Leaderboard.get(type);

  private getResult = (myGoals:number, adversarieGoals:number): number => {
    if (myGoals > adversarieGoals) return 3;
    if (myGoals < adversarieGoals) return 0;
    return 1;
  };

  private createTeam(homeTeamGoals:number, awayTeamGoals:number, teamName:string) {
    return {
      teamGoals: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      teamName,
      matchResult: this.getResult(homeTeamGoals, awayTeamGoals),
    };
  }

  private saveMatch(match: Match) {
    const { homeTeamGoals, awayTeamGoals, teamHome, teamAway } = match;
    const homeTeamName = teamHome.teamName;
    const awayTeamName = teamAway.teamName;
    const homeTeam = this.createTeam(homeTeamGoals, awayTeamGoals, homeTeamName);
    const awayTeam = this.createTeam(awayTeamGoals, homeTeamGoals, awayTeamName);

    if (this.type === 'home' || this.type === 'complete') {
      if (this.leaderboard[homeTeamName] === undefined) {
        this.leaderboard[homeTeamName] = new LeaderBoardTeam(homeTeam);
      } else this.leaderboard[homeTeamName].addMatch(homeTeam);
    }

    if (this.type === 'away' || this.type === 'complete') {
      if (this.leaderboard[awayTeamName] === undefined) {
        this.leaderboard[awayTeamName] = new LeaderBoardTeam(awayTeam);
      } else this.leaderboard[awayTeamName].addMatch(awayTeam);
    }
  }

  public async initLeaderboard() {
    const matches = await this.matchesService.getMatchByStatus(false);

    matches.forEach((match) => this.saveMatch(match));
  }

  public getLeaderBoard() {
    const teams = Object.values(this.leaderboard);

    const sortedTeams = teams.sort((teamA, teamB) => {
      if (teamA.totalPoints < teamB.totalPoints) return -1;
      if (teamA.totalPoints > teamB.totalPoints) return 1;
      if (teamA.totalPoints === teamB.totalPoints) return this.totalPointsDraw(teamA, teamB);
      return 0;
    });

    const sortedLeaderBoard = sortedTeams.map((team) => team.getStats());
    return sortedLeaderBoard.reverse();
  }

  private totalPointsDraw = (teamA:LeaderBoardTeam, teamB:LeaderBoardTeam):number => {
    if (teamA.totalVictories < teamB.totalVictories) return -1;
    if (teamA.totalVictories > teamB.totalVictories) return 1;
    if (teamA.totalVictories === teamB.totalVictories) return this.victoryDraw(teamA, teamB);
    return 0;
  };

  private victoryDraw = (teamA:LeaderBoardTeam, teamB:LeaderBoardTeam):number => {
    if (teamA.goalsBalance < teamB.goalsBalance) return -1;
    if (teamA.goalsBalance > teamB.goalsBalance) return 1;
    if (teamA.goalsBalance === teamB.goalsBalance) return this.goalBalanceDraw(teamA, teamB);
    return 0;
  };

  private goalBalanceDraw = (teamA:LeaderBoardTeam, teamB:LeaderBoardTeam):number => {
    if (teamA.goalsFavor < teamB.goalsFavor) return -1;
    if (teamA.goalsFavor > teamB.goalsFavor) return 1;
    if (teamA.goalsFavor === teamB.goalsFavor) return this.goalsFavorDraw(teamA, teamB);
    return 0;
  };

  private goalsFavorDraw = (teamA:LeaderBoardTeam, teamB:LeaderBoardTeam):number => {
    if (teamA.goalsOwn < teamB.goalsOwn) return 1;
    if (teamA.goalsOwn > teamB.goalsOwn) return -1;
    return 0;
  };
}
