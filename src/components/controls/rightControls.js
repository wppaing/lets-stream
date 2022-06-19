import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { setshowlrc } from "./../../features/layout/mainSlice";
import VolumeControl from "./volumeControl";

export default function RightControl({ audioRef }) {
  const dispatch = useDispatch();
  const { showlrc, theme } = useSelector((state) => state.layout);

  const setShowLyrics = () => {
    showlrc ? dispatch(setshowlrc(false)) : dispatch(setshowlrc(true));
  };

  return (
    <div className={`grid grid-cols-[_1fr_auto] gap-4 items-center text-right`}>
      <div className="flex items-center justify-end gap-2 opacity-70 hover:opacity-100">
        <FontAwesomeIcon icon={faVolumeLow} />
        <VolumeControl audioRef={audioRef} />
      </div>
      <div className="hover:cursor-pointer" title="Lyrics">
        <p
          onClick={setShowLyrics}
          className={`${
            showlrc && "text-accent"
          } transition-colors duration-300`}
        >
          Lyrics
        </p>
      </div>
    </div>
  );
}
