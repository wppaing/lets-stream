import {
  faBackwardStep,
  faChevronDown,
  faCirclePause,
  faCirclePlay,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setisplaying, setcurrentindex } from "../../features/audio/audioSlice";
import { formatDuration, getImage } from "../../utils/util";
import ProgressBar from "./progressbar";

export default function MobileControlDetails({
  audioRef,
  showDetails,
  setShowDetails,
}) {
  const dispatch = useDispatch();
  const {
    currentSong,
    currentData,
    currentIndex,
    currenttime,
    duration,
    isPlaying,
  } = useSelector((state) => state.audio);

  const playPauseHandler = () => {
    if (audioRef.current.paused) {
      dispatch(setisplaying(true));
      audioRef.current.play();
    } else {
      dispatch(setisplaying(false));
      audioRef.current.pause();
    }
  };

  const toggleShowDetails = () => {
    setShowDetails(false);
    document.getElementsByTagName("body")[0].classList.remove("noScroll");
  };

  const backwardClick = () => {
    if (currentData.length > 0) {
      if ((currentIndex - 1) % currentData.length === -1) {
        dispatch(setcurrentindex(currentData.length - 1));
      } else {
        dispatch(setcurrentindex((currentIndex - 1) % currentData.length));
      }
    }
  };

  const forwardClick = () => {
    currentData.length > 0 &&
      dispatch(setcurrentindex((currentIndex + 1) % currentData.length));
  };

  return (
    <>
      {currentSong && (
        <Wrapper
          maxHeight={window.innerHeight}
          showDetails={showDetails}
          className={`fixed left-0 bottom-0 h-screen w-screen bg-[#000000ab] overflow-hidden z-10 px-6 py-4`}
        >
          <div className="relative h-full">
            <div onClick={toggleShowDetails}>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`block ml-auto text-2xl my-6`}
              />
            </div>
            <div>
              <div className="mt-[5%]">
                <img
                  className="w-full "
                  src={getImage(currentSong.images, 300)}
                  alt={currentSong.name}
                />
                <h2 className="font-medium text-xl mt-16">
                  {currentSong.name}
                </h2>
                <h3 className="text-lg mt-1 opacity-75">
                  {currentSong.artist_list[0].name}
                </h3>
              </div>
              <div className="mt-4">
                <ProgressBar
                  audioRef={audioRef}
                  height={"2rem"}
                  showStamp={false}
                />
                <div className="flex items-center justify-between opacity-75">
                  <span>{`${formatDuration(currenttime)}`}</span>
                  <span>{`${formatDuration(duration)}`}</span>
                </div>
              </div>
              <div className="flex items-center justify-around max-w-[75%] mx-auto">
                <div onClick={backwardClick}>
                  <FontAwesomeIcon icon={faBackwardStep} className="text-xl" />
                </div>
                <div onClick={playPauseHandler}>
                  <FontAwesomeIcon
                    icon={isPlaying ? faCirclePause : faCirclePlay}
                    className={`text-5xl`}
                  />
                </div>
                <div onClick={forwardClick}>
                  <FontAwesomeIcon icon={faForwardStep} className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  max-height: ${(props) =>
    props.showDetails ? props.maxHeight + "px" : "0px"};
  transform: ${(props) =>
    props.showDetails ? "translateY(0%)" : "translateY(100%)"};
  transition: 500ms all cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(50px);
`;
