import Aside from "./components/main/aside";
import Nav from "./components/nav";
import Main from "./components/main";
import Control from "./components/controls";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { settheme } from "./features/layout/mainSlice";
import styled from "styled-components";
import { setisplaying } from "./features/audio/audioSlice";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.layout);

  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.theme && dispatch(settheme(localStorage.theme));
    const onSpacebar = (e) => {
      const isInput = ~["TEXTAREA", "INPUT"].indexOf(e.target.tagName);
      if (!isInput && e.keyCode === 32) {
        e.preventDefault();
        if (audioRef.current.paused) {
          audioRef.current.play();
          dispatch(setisplaying(true));
        } else {
          audioRef.current.pause();
          dispatch(setisplaying(false));
        }
      }
    };
    document.addEventListener("keydown", onSpacebar);
    return () => document.removeEventListener("keydown", onSpacebar);
  }, []);

  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.theme = "light";
      dispatch(settheme("light"));
    }
  }, [theme]);

  return (
    <Wrapper
      stTheme={theme}
      className={`${
        localStorage.theme === "dark" && "dark"
      } bg-lightGray dark:bg-dark`}
    >
      <Nav />
      <Aside />
      <Main audioRef={audioRef} />
      <Control audioRef={audioRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.stTheme === "dark" && `black !important`};
`;

export default App;
