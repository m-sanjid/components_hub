import React from "react";
import TeamGallery from "../code/team-gallery";
import { TeamMembers } from "@/lib/constants";

const TeamDemo = () => {
  return <TeamGallery teamMembers={TeamMembers} />;
};

export default TeamDemo;
