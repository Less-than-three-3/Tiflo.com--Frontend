import {WelcomeSection} from "./WelcomeSection/WelcomeSection.jsx";
import {useEffect} from "react";
import {VideoDescSection} from "./VideoDescSection/VideoDescSection.jsx";
import {PhotoDescSection} from "./PhotoDescSection/PhotoDescSection.jsx";

export const HomePage = () => {
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.style.overflowY="scroll";

    return () => {
      html.style.overflowY="hidden";
    }
  }, [])

  return (
    <>
      <div>
        <WelcomeSection/>
        <PhotoDescSection/>
        <VideoDescSection/>
      </div>
    </>
  );
}
