import {WelcomeSection} from "./WelcomeSection/WelcomeSection.jsx";
import {VideoDescSection} from "./VideoDescSection/VideoDescSection.jsx";
import {PhotoDescSection} from "./PhotoDescSection/PhotoDescSection.jsx";

export const HomePage = () => {

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
