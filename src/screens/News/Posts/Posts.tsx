import React from "react";
import TopPosts from "./TopPosts";
import RelatedPosts from "./RelatedPosts";

const Posts = ({ selected }) => {
  return (
    <div className="row">
      <div className="col-md-9 md:order-2">
        <TopPosts selected={selected} />
      </div>
      <div className="col-md-3 pl-0 lg:pr-0 md:order-1">
        <RelatedPosts />
      </div>
    </div>
  );
};

export default Posts;
