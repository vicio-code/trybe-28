import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/leaderboard/', leaderboardController.getHome);
router.get('/leaderboard/home', leaderboardController.getHome);
router.get('/leaderboard/away', leaderboardController.getHome);

export default router;
