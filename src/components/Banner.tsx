import React from "react";

interface BannerProps {
  backgroundImageURL: string;
  title: string;
}

const Banner: React.FC<BannerProps> = ({ backgroundImageURL, title }) => {
  return (
    <section
      className="page-header overlay-gradient"
      style={{
        background: `url(${backgroundImageURL}) center center/cover no-repeat`,
        minHeight: 180,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="inner">
          <h1 className="title">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
