import React from "react";
import "./loading.css";

export const Loading = ({ withAnimation = true, size = 0 }) => {
  return (
    <div className="icon">
      <svg
        viewBox={`0 0 ${size ? size * 1.8 : 50} ${size ? size * 1.8 : 50}`}
        style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      >
        <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          {withAnimation && (
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            ></animateTransform>
          )}
        </path>
      </svg>
    </div>
  );
};
export default Loading;
