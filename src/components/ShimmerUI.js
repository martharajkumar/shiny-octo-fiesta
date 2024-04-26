import React from "react";

const ShimmerCard = () => {
  return (
    <>
      <div className="card-container">
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
      </div>
    </>
  );
};

const ShimmerUI = () => {
  return (
    <div className="res-container">
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
    </div>
  );
};

export default ShimmerUI;
