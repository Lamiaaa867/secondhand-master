export interface ProfileUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  likedProducts?: string[]; // Array of product IDs that the user likes
}