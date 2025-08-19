import React from "react";
import GithubStarButton from "../code/github-star-button";

const GithubButtonDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div>
        <h3>Shadcn GitHub Star Button</h3>
        <GithubStarButton owner="shadcn-ui" repo="ui" />
      </div>
      <div>
        <h3>Components GitHub Star Button</h3>
        <GithubStarButton owner="m-sanjid" repo="components_hub" />
      </div>
    </div>
  );
};

export default GithubButtonDemo;
