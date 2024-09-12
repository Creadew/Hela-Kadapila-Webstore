import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "400px",
  width: "600px",
};

const SlideShow = ({ images }) => {
  return (
    <div className="slide-container border-2 border-primary rounded-lg bg-gray-300">
      <Slide>
        {images?.map((image, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${image})`,
              }}
              className="rounded-lg overflow-hidden"
            >
              {/* <span style={spanStyle}>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShow;
