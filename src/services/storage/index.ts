import { Credentials } from 'types/Credentials';
import { Profile } from 'types/Profile';

class Storage {
  private credentialsKey = 'credentials';

  private profileKey = 'profile';

  private storage = window.localStorage;

  getCredentials = (): Credentials | null => {
    const credentials = this.storage.getItem(this.credentialsKey);

    if (credentials) {
      return JSON.parse(credentials) as Credentials;
    }
    return null;
  };

  setCredentials = (credentials: Credentials): void =>
    this.storage.setItem(this.credentialsKey, JSON.stringify(credentials));

  removeCredentials = (): void => this.storage.removeItem(this.credentialsKey);

  getProfile = (): Profile | null => {
    const profile = this.storage.getItem(this.profileKey);

    if (profile) {
      return JSON.parse(profile) as Profile;
    }
    return null;
  };

  setProfile = (profile: Profile): void => {
    this.storage.setItem(this.profileKey, JSON.stringify(profile));
    window.dispatchEvent(new Event('storage'));
  };

  removeProfile = (): void => {
    this.storage.removeItem(this.profileKey);
    window.dispatchEvent(new Event('storage'));
  };
}

export default new Storage();
