import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (req: Request, res: Response) => {
    const teams = await this.teamsService.getAll();

    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getById(parseInt(id, 10));

    res.status(200).json(team);
  };
}
