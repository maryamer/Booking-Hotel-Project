import { MdLocationOn, MdLogout } from "react-icons/md";
import { HiCalendar, HiMail, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { BsBookmarkFill } from "react-icons/bs";

import { useState } from "react";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context1/AuthProvider";
import Data from "../../../data/Data";
import { useDispatch } from "react-redux";

function Header({ isAuthenticated, logout }) {
  const { user } = Data();
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name]++ : options[name]--,
      };
    });
  };
  const handleSearch = () => {
    console.log(options);
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    //note => setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
    console.log("search");
  };
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));

  return (
    <div className="header w-full flex justify-center  items-center mt-1 ">
      <div className="headerSearch flex justify-center md:justify-between items-center border rounded-3xl ">
        <NavLink to="/bookmark">
          {" "}
          <span className="flex md:hidden">
            <BsBookmarkFill className="text-blue-600 mx-1 w-5 h-5 md:mx-0" />
          </span>
          <span className="hidden md:flex">Bookmarks</span>
        </NavLink>
        <div className="headerSearchItem flex relative mx-1 items-center">
          <MdLocationOn className="headerIcon locationIcon text-[#f43f5e]" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text "
            placeholder="where to go?"
            className="headerSearchInput py-3 w-24 text-base"
            name="destination"
            id="destination"
          />
          <span className="seperator hidden md:inline-block w-[1px] h-8  bg-[#94a3b8]"></span>
        </div>
        <div className="headerSearchItem flex relative items-center">
          <div
            id="dateDropDown"
            className="dateDropDown flex items-center justify-center md:mx-2 text-xs "
            onClick={() => setOpenDate((prev) => !prev)}
          >
            <HiCalendar className="headerIcon dateIcon text-green-800 md:w-5 md:h-5 w-7 h-7 md:mx-0 mx-3" />
            <span className="hidden md:flex ">
              {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyy"
              )} `}
            </span>
          </div>
          {openDate && (
            <div ref={dateRef}>
              <DateRange
                onChange={(item) => setDate([item.selection])}
                ranges={date}
                className="date md:absolute fixed left-8 top-14 md:top-12 md:-left-20z-50"
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            </div>
          )}
          <span className="seperator hidden md:inline-block w-[1px] h-8  bg-[#94a3b8]"></span>
        </div>
        <div className="headerSearchItem flex relative items-center ">
          <div
            className="md:mx-2"
            id="optionDropDown"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            <span className="flex md:hidden font-bold text-blue-700 justify-center text-center text-sm">
              Room Options
            </span>
            <span className="hidden md:flex">
              {options.adult} adult &bull; {options.children} children &bull;{" "}
              {options.room} room
            </span>
          </div>
          {openOptions && (
            <GuestOptionList
              options={options}
              handleOptions={handleOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator hidden md:inline-block w-[1px] h-8  bg-[#94a3b8]"></span>
        </div>
        <div className="headerSearchItem flex relative items-center md:mx-2">
          <button
            className="headerSearchBtn flex items-center justify-center md:bg-[#64748b] p-2 rounded-2xl md:text-white"
            onClick={handleSearch}
          >
            <HiSearch className="headerIcon w-6 h-6 text-gray-700 inline-block" />
          </button>
        </div>
      </div>
      <User user={user} isAuthenticated={isAuthenticated} logout={logout} />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div
      className="guestOptions bg-white shadow-md shadow-white rounded-2xl p-4 border md:absolute md:top-8 fixed top-16 right-10 w-56 z-50 "
      ref={optionsRef}
    >
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem flex items-center gap-4 justify-between">
      <span className="optionText inline-block flex-1 text-sm">{type}</span>
      <div className="optionCounter flex items-center gap-4 ">
        <button
          className="optionCounterBtn inline-block"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber p-2 text-[#64748b]bg-[#f1f5f9] rounded-lg inline-block">
          {options[type]}
        </span>
        <button
          className="optionCounterBtn inline-block"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User({ user, isAuthenticated, logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const dispatch = useDispatch();
  return (
    <div className="flex items-center md:mx-1 ">
      {isAuthenticated ? (
        <div className="flex items-center ">
          <strong className="self-center">{user.name}</strong>
          <button className="flex items-center" onClick={handleLogout}>
            <span className="mx-1 text-red-600 font-medium">logout </span>
            <MdLogout className="logout icon text-[color:var(--rose-500)] w-[1.1rem] h-[1.1rem]" />
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="self-center ">
          login
        </NavLink>
      )}
    </div>
  );
}
