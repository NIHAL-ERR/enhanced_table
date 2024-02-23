import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import ToggleMenu from "./ToggleMenu";

export default function Header() {
  //For toggle popover
  const [isTogglePopoverVisible, setTogglePopoverVisible] = useState(false);
  const [togglePopoverPosition, setTogglePopoverPosition] = useState({
    x: 0,
    y: 0,
  });

  const toggleTogglePopover = (event) => {
    setTogglePopoverVisible(!isTogglePopoverVisible);

    setTogglePopoverPosition({ x: event.clientX - 150, y: event.clientY + 10 });
  };
  // For filter popover
  const [isFilterPopoverVisible, setFilterPopoverVisible] = useState(false);
  const [filterPopoverPosition, setFilterPopoverPosition] = useState({
    x: 0,
    y: 0,
  });

  const filterTogglePopover = (event) => {
    setFilterPopoverVisible(!isFilterPopoverVisible);

    setFilterPopoverPosition({ x: event.clientX - 150, y: event.clientY + 10 });
  };
  //
  useEffect(() => {
    if (isTogglePopoverVisible) setFilterPopoverVisible(false);
  }, [isTogglePopoverVisible]);
  useEffect(() => {
    if (isFilterPopoverVisible) setTogglePopoverVisible(false);
  }, [isFilterPopoverVisible]);

  //
  return (
    <div className="header-container">
      <div>
        <SearchBar />
      </div>
      <div className="header-left-controls-container">
        <div>
          {" "}
          <Filter
            togglePopover={filterTogglePopover}
            isPopoverVisible={isFilterPopoverVisible}
            popoverPosition={filterPopoverPosition}
          />
        </div>
        <div>
          <ToggleMenu
            togglePopover={toggleTogglePopover}
            isPopoverVisible={isTogglePopoverVisible}
            popoverPosition={togglePopoverPosition}
          />
        </div>
      </div>
    </div>
  );
}
