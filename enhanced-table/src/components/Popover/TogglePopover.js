import React, { useContext, useEffect } from "react";
import "./Popover.css";
import { togglePopoverarr } from "../../constants/TogglePopoverContent";
import { TableManagementContext } from "../../App";
import { convertString } from "../../utils/stringConvertUtil";

function AnchorPopover({ isPopoverVisible, popoverPosition }) {
  const [tableManagementState, setTableManagementState] = useContext(
    TableManagementContext
  );
  const handleToggleColumns = (toggleContent) => {
    setTableManagementState((prevState) => ({
      ...prevState,
      toggle: {
        ...prevState.toggle,
        [toggleContent]: !prevState.toggle[toggleContent],
      },
    }));
  };

  return (
    <div className="anchor-popover">
      {isPopoverVisible && (
        <div
          className="popover-content"
          style={{ top: popoverPosition.y, left: popoverPosition.x }}
        >
          <div className="">
            <h3>Toggle Columns</h3>
            {togglePopoverarr.map((item) => (
              <div>
                {" "}
                <input
                  type="checkbox"
                  onClick={() => {
                    handleToggleColumns(convertString(item));
                  }}
                  checked={tableManagementState.toggle[convertString(item)]}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnchorPopover;
