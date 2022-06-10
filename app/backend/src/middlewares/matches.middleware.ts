import { NextFunction, Request, Response } from 'express';
import Token from '../auth/login.auth';
import Team from '../database/models/teams';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = new Token();

  if (authorization) {
    const verify = token.decode(authorization);

    if (verify === 'error') return res.status(401).json({ message: 'Invalid Token' });
    next();
  } else {
    return res.status(400).json({ message: 'Token is required' });
  }
};

const matchesValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    const message = { message: 'It is not possible to create a match with two equal teams' };
    return res.status(401).json(message);
  }

  const findHomeTeamId = await Team.findByPk(homeTeam);
  const findAwayTeamId = await Team.findByPk(awayTeam);

  if (!findHomeTeamId || !findAwayTeamId) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export {
  tokenValidation,
  matchesValidation,
};
