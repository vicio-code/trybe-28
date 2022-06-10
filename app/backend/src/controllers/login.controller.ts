import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  private loginServie: LoginService;

  constructor() {
    this.loginServie = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const userLogin = await this.loginServie.login({ email });
    res.status(200).json(userLogin);
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (typeof authorization === 'string') {
      const role = await this.loginServie.validate(authorization);
      if (!role)res.status(421).json({ message: 'invalid token' });
      else res.status(200).json(role);
    }
  };
}
