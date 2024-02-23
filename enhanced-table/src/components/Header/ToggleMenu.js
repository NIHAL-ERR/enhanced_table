import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import AnchorPopover from "../Popover/TogglePopover";

export default function ToggleMenu({togglePopover,isPopoverVisible,popoverPosition}) {

  return (
    <>
      <div className="toggle-menu-box" href="#" onClick={togglePopover}>
        <TiThMenu />
      </div>
      <AnchorPopover
        isPopoverVisible={isPopoverVisible}
        popoverPosition={popoverPosition}
      />
    </>
  );
}
