import React from "react";
import GithubStarButton from "../code/github-star-button";

const GithubButtonDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div>
        <h4>Shadcn GitHub Star Button</h4>
        <GithubStarButton owner="shadcn-ui" repo="ui" />
      </div>
      <div>
        <h4>Components GitHub Star Button</h4>
        <GithubStarButton owner="m-sanjid" repo="components_hub" />
      </div>
    </div>
  );
};

export default GithubButtonDemo;
