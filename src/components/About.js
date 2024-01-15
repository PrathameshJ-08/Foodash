import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    // Start playing the video when the component mounts
    const iframe = document.getElementById("aboutVideo");
    iframe.src += "&autoplay=1";

    // Cleanup function to pause the video when the component is unmounted
    return () => {
      iframe.src = iframe.src.replace("&autoplay=1", "");
    };
  }, []);

  return (
    <div>
      <iframe
        id="aboutVideo"
        width="560"
        height="315"
        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default About;
