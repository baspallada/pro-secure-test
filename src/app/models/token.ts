export class Token {
  sub: number;
  username: string;
  iat: number;
  accessToken: string;
  refreshToken: string;
  exp: number;

  /**
   * Asks for an object with the same properties and assigns the Token type.
   * @param obj the object to be assigned to token.
   */
  public static createFromJwt(obj: any): Token {
    return Object.assign(new Token(), obj);
  }
}

