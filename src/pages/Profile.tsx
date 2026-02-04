import { useEffect, useState } from "react";

interface Claim {
  type: string;
  value: string;
}

const Profile = () => {
  const [claims, setClaims] = useState<Claim[] | null>(null);

  useEffect(() => {}, []);

  return <div>Profile</div>;
};

export default Profile;
