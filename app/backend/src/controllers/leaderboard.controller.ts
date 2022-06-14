import { Request, Response } from 'express';
import Leaderboard from '../leaderboard/Leaderboard';

export default class LeaderboardController {
  public getHome = async (req: Request, res: Response) => {
    const type = req.url.split('/')[2] === undefined
      ? 'complete'
      : req.url.split('/')[2];

    const leaderboard = await Leaderboard.leaderboardFactory(type);

    res.status(200).json(leaderboard);
  };
}
