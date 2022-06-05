import { useEffect, useState } from "react";
import { Lrc } from "react-lrc";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { decodeLrc } from "../../utils/util";

export default function LrcView() {
  const { currentSong, currenttime, isPlaying } = useSelector(
    (state) => state.audio
  );
  const { showlrc } = useSelector((state) => state.layout);
  const [lrc, setLrc] = useState("");

  useEffect(() => {
    if (currentSong) {
      const decodedLrc = decodeLrc(currentSong.lrc_content);
      setLrc(decodedLrc);
    }
  }, [currentSong]);

  const lineRenderer = ({ active, line }) => {
    return (
      <p
        style={{ margin: "0.5rem 0rem" }}
        className={`text-base ${
          active
            ? `text-accent font-bold scale-110`
            : `text-grayishDark dark:text-lightGray`
        } transition-transform duration-300`}
      >
        {line.content}
      </p>
    );
  };

  return (
    <Wrapper
      showLrc={showlrc}
      className={`bg-light dark:bg-grayishDark ${
        showlrc && "border-border border-b"
      }
      before:[background:_linear-gradient(to_bottom,_white_15%,_#0000_85%)]
      dark:before:[background:_linear-gradient(to_bottom,_#202326_15%,_#0000_85%)]
      after:[background:_linear-gradient(to_top,_white_15%,_#0000_85%)]
      dark:after:[background:_linear-gradient(to_top,_#202326_15%,_#0000_85%)]`}
    >
      {lrc.length > 0 ? (
        <Lrc
          className="h-full lrc select-none"
          lrc={lrc}
          currentMillisecond={currenttime * 1000}
          lineRenderer={lineRenderer}
          autoScroll
          topBlank
          bottomBlank
          intervalOfRecoveringAutoScrollAfterUserScroll={500}
        />
      ) : (
        <div className={`flex items-center justify-center h-full`}>
          {isPlaying ? "No Lyrics Available" : "Play a song to see lyrics"}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  inset: 0;
  text-align: center;
  transform: translateY(-100%);
  overflow: hidden;
  height: 46vh;
  z-index: 2;
  max-height: ${(props) => (props.showLrc ? "50vh" : "0%")};
  transition: max-height 600ms ease-in-out 0s;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 7rem;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5rem;
  }

  .lrc {
    overflow-x: hidden;

    /* webkit */
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    /* firefox */
    scrollbar-width: none;

    /* ie */
    -ms-overflow-style: none;
  }
`;
