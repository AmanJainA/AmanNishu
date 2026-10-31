
import React from "react";
import "./Video.css";

export default function Video() {
  return (
    <div className="wedding-video-page">
      <video
        id="ForcePlay"
        className="wedding-video"
        autoPlay
        loop
        muted
        playsInline
        controls
        poster="/assets/images/wedding.jpeg"
      >
        <source src="/video/wedding.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
