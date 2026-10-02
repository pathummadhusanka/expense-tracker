export interface UserProfile {
  name: string;
  email: string;
}

export const defaultUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com'
};