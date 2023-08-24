import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>Author: {data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt={data.alt} />
      </div>
      <a target="_blank" href={data.src.large}>
        Download picture
      </a>
    </div>
  );
};

export default Picture;
