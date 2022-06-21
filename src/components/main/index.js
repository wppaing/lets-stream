import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import ArtistInfo from "./artistinfo";
import AlbumInfo from "./albuminfo";
import { useEffect } from "react";
import {
  setbuffered,
  setcurrentsong,
  setcurrenttime,
  setduration,
  setisplaying,
  setcurrentindex,
} from "../../features/audio/audioSlice";
import HomePage from "./homepage";

export default function Main({ audioRef }) {
  const dispatch = useDispatch();
  const { navHeight, isNavOpen } = useSelector((state) => state.layout);
  const { currentSong, currentIndex, currentData } = useSelector(
    (state) => state.audio
  );

  /*
    if currentsong was changed in state then it will play
    the audio based on that data
  */
  useEffect(() => {
    if (currentSong) {
      audioRef.current.play();
      dispatch(setisplaying(true));
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      const id = currentData[currentIndex].id;
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/song?id=${id}`)
        .then((response) => {
          dispatch(setcurrentsong(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, [currentIndex]);

  const loadedMetadata = (e) => {
    dispatch(setduration(e.target.duration));
    onAudioProgress();
  };

  const updateDuration = (e) => {
    dispatch(setcurrenttime(e.target.currentTime));
  };

  const songEndHandler = () => {
    if (currentData.length > 0) {
      dispatch(setcurrentindex((currentIndex + 1) % currentData.length));
    }
    if (!audioRef.current.playing) {
      dispatch(setisplaying(false));
    }
  };

  const onAudioProgress = () => {
    let duration = audioRef.current.duration;
    if (duration > 0) {
      for (var i = 0; i < audioRef.current.buffered.length; i++) {
        if (
          audioRef.current.buffered.start(
            audioRef.current.buffered.length - 1 - i
          ) < audioRef.current.currentTime
        ) {
          const bufferedWidth =
            (audioRef.current.buffered.end(
              audioRef.current.buffered.length - 1 - i
            ) /
              duration) *
            100;
          dispatch(setbuffered(bufferedWidth));
          break;
        }
      }
    }
  };

  return (
    <div
      style={{ marginTop: `${navHeight}px` }}
      className={`bg-lightGray dark:bg-dark py-4 min-h-screen text-dark dark:text-lightGray ${
        isNavOpen ? "md:ml-44" : "ml-0"
      } transition-[margin_200ms]`}
    >
      <Routes>
        <Route
          path="/artist/:id"
          element={<ArtistInfo audioRef={audioRef} />}
        />
        <Route path="/album/:id" element={<AlbumInfo audioRef={audioRef} />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.play_url_list[0]}
          className={"hidden"}
          onLoadedMetadata={loadedMetadata}
          onTimeUpdate={updateDuration}
          onEnded={songEndHandler}
        ></audio>
      )}
    </div>
  );
}
