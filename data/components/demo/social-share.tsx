import React from "react";
import SocialLinks from "../code/social-share";

const SocialShareDemo = () => {
  return (
    <div className="py-20">
      <SocialLinks
        profiles={{
          github: "https://github.com/m-sanjid",
          twitter: "https://x.com/dev_sanjid",
          linkedin: "https://linkedin.com/in/muhammedsanjid1",
          email: "mailto:muhammeddsanjid@gmail.com",
        }}
        showTooltip
        size={22}
      />
    </div>
  );
};

export default SocialShareDemo;
