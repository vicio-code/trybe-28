import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import { tokenValidation, matchesValidation } from '../middlewares/matches.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);
router.post('/matches', tokenValidation, matchesValidation, matchesController.addNewMatch);
router.patch('/matches/:id/finish', matchesController.finishMatch);

export default router;
122