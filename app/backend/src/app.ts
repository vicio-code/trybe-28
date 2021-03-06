import * as express from 'express';
import LoginRoutes from './routes/login.routes';
import TeamRoutes from './routes/teams.routes';
import MatchesRoutes from './routes/matches.routes';
import Leaderboard from './routes/leaderboard.routes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(LoginRoutes);
    this.app.use(TeamRoutes);
    this.app.use(MatchesRoutes);
    this.app.use(Leaderboard);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => {
      console.log(`rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
