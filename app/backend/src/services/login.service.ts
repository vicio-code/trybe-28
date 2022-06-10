import User from '../database/models/users';
import Token from '../auth/login.auth';

export default class LoginService {
  public token: Token;

  constructor() {
    this.token = new Token();
  }

  private userParser = (userInfo: User) => {
    const { id, username, role, email } = userInfo;
    return { id, username, role, email };
  };

  public login = async (user:{ email:string }) => {
    const { email } = user;
    const userLogin = await User.findOne({ where: { email } });

    if (!userLogin) return null;

    const userToken = this.token.create(userLogin);
    const userInfos = this.userParser(userLogin);

    return {
      user: userInfos,
      token: userToken,
    };
  };

  public validate = async (token: string) => {
    const userInfos = this.token.decode(token);
    if (userInfos === 'error') return null;
    return userInfos.role;
  };
}
