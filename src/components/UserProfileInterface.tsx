import Address from "./AddressInterface";

interface UserProfile {
  userId: string;
  brandName: string;
  firstName: string;
  lastName: string;
  gender: string;
  address?: Address; // Optional address field
  createdTs: number;
  username: string;
}

export default UserProfile;
