import Match from '../database/models/matches';
import MatchesService from '../services/matches.service';
import LeaderBoardTeam from './LeaderBoardTeam';

interface LeaderboardI {
  [key:string]: LeaderBoardTeam
}

export default class Leaderboard {
  matchesService: MatchesService;
  leaderboard: LeaderboardI;

  constructor(type: string) {
    this.matchesService = new MatchesService();
    this.leaderboard = { };
    this.initLeaderboard(type);
  }

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

  private saveMatch(match: Match, type: string) {
    const { homeTeamGoals, awayTeamGoals, teamHome, teamAway } = match;
    const homeTeamName = teamHome.teamName;
    const awayTeamName = teamAway.teamName;
    const homeTeam = this.createTeam(homeTeamGoals, awayTeamGoals, homeTeamName);
    const awayTeam = this.createTeam(awayTeamGoals, homeTeamGoals, awayTeamName);

    if (type === 'home' || type === 'full') {
      if (this.leaderboard[homeTeamName] === undefined) {
        this.leaderboard[homeTeamName] = new LeaderBoardTeam(homeTeam);
      } else this.leaderboard[homeTeamName].addMatch(homeTeam);
    }

    if (type === 'away' || type === 'full') {
      if (this.leaderboard[awayTeamName] === undefined) {
        this.leaderboard[awayTeamName] = new LeaderBoardTeam(awayTeam);
      } else this.leaderboard[awayTeamName].addMatch(awayTeam);
    }
  }

  private async initLeaderboard(type: string) {
    const matches = await this.matchesService.getMatchByStatus(false);
    matches.forEach((match) => this.saveMatch(match, type));
  }
}
