import React from 'react';

interface ProfileProps {
  userProfile: {

  }
}

export const Profile: React.FC<ProfileProps> = (props) => {
  console.log(props)
  return (
    <div>
      User Profile
    </div>
  );
};
;