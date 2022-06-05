import { useSelector, useDispatch } from "react-redux";
import { setnavopen, settheme } from "../../features/layout/mainSlice";
import styled from "styled-components";

export default function Aside() {
  const dispatch = useDispatch();
  const { isNavOpen, navHeight } = useSelector((state) => state.layout);
  const actualNavHeight = navHeight + "px";

  const toggleDark = () => {
    const theme = localStorage.theme;
    !theme && dispatch(settheme("light"));
    if (theme == "light") {
      dispatch(settheme("dark"));
      localStorage.theme = "dark";
    } else {
      dispatch(settheme("light"));
      localStorage.theme = "light";
    }
  };

  return (
    <Wrapper
      navHeight={navHeight}
      className={`flex flex-col p-4 top-0 min-h-screen fixed left-0 ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } transition-[300ms] w-44 border-r border-t border-border text-black dark:text-lightGray bg-lightGray dark:bg-dark z-[1]`}
    >
      <button onClick={() => dispatch(setnavopen(false))}>Close</button>
      <button onClick={toggleDark}>Toggle dark</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (min-width: 670px) {
    top: ${(props) => props.navHeight + "px"};
  }
`;
