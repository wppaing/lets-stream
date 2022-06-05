import { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function VolumeControl({ audioRef }) {
  const [val, setVal] = useState(100);
  const { theme } = useSelector((state) => state.layout);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = val / 100;
    }
  }, [val]);

  return (
    <Wrapper theme={theme} className="h-0.5 w-1/3 max-w-[5rem]">
      <Slider min={0} max={100} value={val} onChange={(val) => setVal(val)} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .rangeslider {
    position: relative;
    background: ${(props) => (props.theme === "dark" ? "#81868c" : "#d7dbe1")};
    -ms-touch-action: none;
    touch-action: none;

    & .rangeslider__fill {
      display: block;
    }
    .rangeslider__handle {
      background: #fff;
      border: 1px solid #ccc;
      cursor: pointer;
      display: inline-block;
      position: absolute;

      .rangeslider__active {
        opacity: 1;
      }
    }

    .rangeslider__handle-tooltip {
      display: none;
    }
  }

  .rangeslider-horizontal {
    height: 100%;
    .rangeslider__fill {
      height: 100%;
      background-color: ${(props) =>
        props.theme === "dark" ? "#ffffff" : "#212529"};
      border-radius: 10px;
      top: 0;
    }
    .rangeslider__handle {
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid;
      border-radius: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
`;
