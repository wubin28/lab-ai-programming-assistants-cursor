import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className="h-2 w-2 rounded-full bg-white animate-pulse"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="h-2 w-2 rounded-full bg-white animate-pulse"
        style={{ animationDelay: "300ms" }}
      ></div>
      <div
        className="h-2 w-2 rounded-full bg-white animate-pulse"
        style={{ animationDelay: "600ms" }}
      ></div>
      <span className="ml-2">Optimizing...</span>
    </div>
  );
};

export default LoadingIndicator;
