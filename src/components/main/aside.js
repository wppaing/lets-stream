import { useSelector, useDispatch } from "react-redux";
import { setnavopen, settheme } from "../../features/layout/mainSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHeart,
  faArrowUpWideShort,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Aside() {
  const dispatch = useDispatch();
  const { isNavOpen, navHeight } = useSelector((state) => state.layout);
  const theme = localStorage.theme;
  const isDark = () => theme === "dark";

  const toggleDark = () => {
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
      <div
        className={`ml-auto sm:hidden`}
        onClick={() => dispatch(setnavopen(false))}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div>
        <h4 className="mb-4 opacity-60 text-sm">Browse</h4>
        <ul className="text-sm">
          <li className="mb-2">
            <a href="#">
              <FontAwesomeIcon icon={faHeart} className={`mr-3 text-accent`} />
              Likes
            </a>
          </li>
          <li className="mb-2">
            <a href="#">
              <FontAwesomeIcon icon={faList} className={`mr-3 text-accent`} />
              Playlists
            </a>
          </li>
          <li className="mb-2">
            <a href="#">
              <FontAwesomeIcon
                icon={faArrowUpWideShort}
                className={`mr-3 text-accent`}
              />
              Popular
            </a>
          </li>
          <li className="mb-2 cursor-pointer" onClick={toggleDark}>
            <FontAwesomeIcon
              icon={isDark() ? faSun : faMoon}
              className={`mr-3 text-accent`}
            />
            {isDark() ? "Light Mode" : "Dark Mode"}
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (min-width: 670px) {
    top: ${(props) => props.navHeight + "px"};
  }
`;
