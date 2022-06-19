import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setnavopen, setnavheight } from "../../features/layout/mainSlice";
import {
  setcurrentdata,
  setcurrentindex,
  setcurrentsong,
} from "../../features/audio/audioSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { navHeight } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [keyword, setKeyword] = useState("");
  const [val, setVal] = useState("");
  const [options, setOptions] = useState();
  const [visible, setVisible] = useState(false);
  const [showinput, setShowinput] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    dispatch(setnavheight(nav.clientHeight));

    const handleClick = (event) => {
      if (inputRef && !inputRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    // Event listener for autocomplete layout
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggleAside = () => {
    dispatch(setnavopen());
  };

  useEffect(() => {
    setVal(keyword);
    const delayDebounceFn = setTimeout(() => {
      if (keyword.length === 0) {
        setOptions(null);
      } else {
        search(keyword);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const search = async (keyword) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/search?keyword=${keyword}`)
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => console.log(error));
  };

  const suggestionClickHandler = (option) => {
    setVal(option.name);
    setVisible(false);
    switch (option.type) {
      case "Artist":
        navigate(`/artist/${option.id}`);
        break;
      case "Album":
        navigate(`/album/${option.id}`);
        break;
      case "Song":
        directPlayer(option.id);
        break;
      default:
        setVisible(false);
    }
  };

  const directPlayer = (id) => {
    dispatch(setcurrentdata([]));
    dispatch(setcurrentindex(0));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/song?id=${id}`)
      .then((response) => dispatch(setcurrentsong(response.data)))
      .catch((error) => console.log(error));
  };

  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav
      id="navbar"
      className="grid grid-cols-2 sm:grid-cols-4 items-center z-[1] fixed left-0 top-0 w-screen px-4 mx-auto border-b border-border text-grayishDark dark:text-lightGray bg-light dark:bg-dark"
    >
      <div className="grow">
        <div className="space-x-4 flex">
          <button onClick={toggleAside}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <a
            href="/"
            onClick={goHome}
            className="font-medium text-accent text-xl whitespace-nowrap"
          >
            Let's Stream
          </a>
        </div>
      </div>
      <div className="sm:col-span-2 py-3 w-min sm:w-full ml-auto">
        <div
          style={{
            position: showinput ? "absolute" : "relative",
            height: showinput ? `${navHeight}px` : "",
          }}
          className={`${
            showinput ? `p-2 bg-light dark:bg-dark` : "py-2"
          } sm:py-0 inset-0 space-x-2 sm:space-x-0 flex items-center justify-center sm:rounded-full mx-auto max-w-xl sm:bg-lightGray sm:dark:bg-grayishDark`}
          ref={inputRef}
        >
          <input
            className={`${
              !showinput && "hidden"
            } p-1.5 px-4 sm:block w-full text-sm focus-visible:outline-[#e7e7e76b] dark:focus-visible:outline-none rounded-full bg-lightGray dark:bg-grayishDark`}
            type="text"
            placeholder="Search"
            value={val}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setVisible(true)}
          />
          <FontAwesomeIcon
            className={`sm:hidden`}
            icon={showinput ? faXmark : faMagnifyingGlass}
            onClick={() => setShowinput(!showinput)}
          />
          {visible && (
            <div
              className={`noscrollbar absolute max-h-60 overflow-y-scroll bg-light dark:bg-dark w-full left-0 top-full mt-2 rounded-[0.2rem] border-border ${
                options && "border"
              }`}
            >
              <ul>
                {options &&
                  React.Children.toArray(
                    options.section_list.map((option) => {
                      return (
                        <li
                          onClick={() => suggestionClickHandler(option)}
                          className={
                            "text-base md:text-sm flex items-center space-x-4 py-2 px-3 hover:cursor-pointer hover:bg-lightGray dark:hover:bg-grayishDark"
                          }
                        >
                          <div className="w-8">
                            <img
                              src={option.images[0]}
                              alt={option.name}
                              className={`w-8 ${
                                option.type === "Artist"
                                  ? "rounded-full"
                                  : "rounded-sm"
                              }`}
                            />
                          </div>
                          <div>
                            {option.name} • {option.type}
                          </div>
                        </li>
                      );
                    })
                  )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grow text-right hidden sm:block">
        <div className="space-x-4 hidden sm:block">
          <a href="#">Sign in</a>
          <a
            href="#"
            className="px-4 py-1 bg-accent hover:bg-accent-[200] rounded-full text-light"
          >
            Sign Up
          </a>
        </div>
        <div className="sm:hidden">Menu</div>
      </div>
    </nav>
  );
};

export default Nav;
