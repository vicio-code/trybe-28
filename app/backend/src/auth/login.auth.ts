import { sign, SignOptions, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

export default class Token {
  private secret:string;
  public jwtConfig: SignOptions;

  constructor() {
    this.secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this.jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  }

  public create = (userInfo: any) => {
    const newToken = sign({ data: userInfo }, this.secret, this.jwtConfig);
    return newToken;
  };

  public decode = (token: string) => {
    const decoded = verify(token, this.secret);
    if (typeof decoded !== 'string') return decoded.data;
  };
}
