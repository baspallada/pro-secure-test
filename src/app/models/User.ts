export class User {
  discordId: string;
  discordName: string;
  timezone: string;
  discriminator: number;
  avatarUrl: string;
  location?: string;
  nameSportsTeam?: string;
  realName?: string;
  servers?: [];

  /**
   * Asks for an object with the same properties and assigns the User type.
   * @param obj the object to be assigned to token.
   */
  public static createUserFromRawObject(obj: any): User {
    return Object.assign(new User(), obj);
  }
}
