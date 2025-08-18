import React from "react";
import SocialLinks from "../code/social-share";

const SocialShareDemo = () => {
  return (
    <SocialLinks
      profiles={{
        github: "https://github.com/m-sanjid",
        twitter: "https://x.com/sanjid357",
        linkedin: "https://linkedin.com/in/muhammedsanjid1",
        email: "mailto:sanjid.dev@gmail.com",
      }}
      showTooltip
      size={22}
    />
  );
};

export default SocialShareDemo;
