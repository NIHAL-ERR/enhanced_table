import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import AnchorPopover from "../Popover/FilterPopover";
import "./header.css";

export default function Filter({
  togglePopover,
  isPopoverVisible,
  popoverPosition,
}) {
  return (
    <>
      <div className="filter-container" href="#" onClick={togglePopover}>
        <div>
          <FaFilter />
        </div>
        <div>Filters</div>
      </div>
      <AnchorPopover
        isPopoverVisible={isPopoverVisible}
        popoverPosition={popoverPosition}
      />
    </>
  );
}
