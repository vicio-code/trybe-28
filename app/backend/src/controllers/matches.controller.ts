import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const status = inProgress === 'true';

    if (inProgress !== undefined) {
      const matches = await this.matchesService.getMatchByStatus(status);
      res.status(200).json(matches);
    } else {
      const matches = await this.matchesService.getAll();
      res.status(200).json(matches);
    }
  };

  public addNewMatch = async (req: Request, res: Response) => {
    const matchInfo = req.body;

    const newMatch = await this.matchesService.addNewMatch(matchInfo);

    res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.finishMatch(parseInt(id, 10));

    res.status(200).json({ message: 'Finished' });
  };
}
