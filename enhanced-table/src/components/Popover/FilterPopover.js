import React, { useContext, useState, useEffect } from "react";
import "./Popover.css";
import { customersJSON } from "../../constants/CustomersJSON";
import { convertDate } from "../../utils/dateUtils";
import { TableManagementContext } from "../../App";

function AnchorPopover({ isPopoverVisible, popoverPosition }) {
  const [tableManagementState, setTableManagementState] = useContext(
    TableManagementContext
  );
  const initialFormValues = {
    minAmount: tableManagementState.formVal.minAmount,
    maxAmount: tableManagementState.formVal.maxAmount,
    createdAt: tableManagementState.formVal.createdAt,
    dueDate: tableManagementState.formVal.dueDate,
    status: tableManagementState.formVal.status,
  };
  const [formVal, setFormVal] = useState(initialFormValues);
  const updateFormValues = (e, fieldName) => {
    setFormVal({
      ...formVal,
      [fieldName]: e.target.value,
    });
  };
  const handleClear = (e) => {
    setFormVal(initialFormValues);
    setTableManagementState({
      ...tableManagementState,
      formVal: {
        minAmount: 0,
        maxAmount: 0,
        createdAt: "",
        dueDate: "",
        status: "",
      },
    });
  };
  const handleSave = (e) => {
    if (Number(formVal.minAmount) <= Number(formVal.maxAmount)) {
      setTableManagementState({
        ...tableManagementState,
        formVal,
      });
    }
  };



  return (
    <div className="anchor-popover">
      {isPopoverVisible && (
        <div
          className="popover-content"
          style={{ top: popoverPosition.y, left: popoverPosition.x }}
        >
          <div>
            <h3>Table Filters</h3>

            <div>
              <label>Amount</label>
              <div>
                <input
                  type="number"
                  name="Amount"
                  onChange={(e) => {
                    updateFormValues(e, "minAmount");
                  }}
                  value={formVal.minAmount}
                />
                <input
                  type="number"
                  name="Amount"
                  onChange={(e) => {
                    updateFormValues(e, "maxAmount");
                  }}
                  value={formVal.maxAmount}
                />
              </div>
            </div>
            <div>
              <label>Created Date</label>
              <div>
                <select
                  placeholder="Search by created date"
                  style={{ width: "100%" }}
                  value={formVal.createdAt}
                  onChange={(e) => {
                    updateFormValues(e, "createdAt");
                  }}
                >
                  <option value="" disabled selected>
                    Search by created date
                  </option>
                  {customersJSON.map((item, index) => {
                    return (
                      <option value={item.createdAt}>
                        {convertDate(item.createdAt)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <label>Due Date</label>
              <div>
                <select
                  placeholder="Search by due date"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    updateFormValues(e, "dueDate");
                  }}
                  value={formVal.dueDate}
                >
                  <option value="" disabled selected>
                    Search by due date
                  </option>
                  {customersJSON.map((item, index) => {
                    return (
                      <option value={item.dueDate}>
                        {convertDate(item.dueDate)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <label>Status</label>
              <div>
                <select
                  placeholder="Search by due date"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    updateFormValues(e, "status");
                  }}
                  value={formVal.status}
                >
                  <option value="" disabled selected>
                    Select Status
                  </option>
                  {customersJSON.map((item, index) => {
                    return <option value={item.status}>{item.status}</option>;
                  })}
                </select>
              </div>
            </div>
            <button
              className="clear-btn"
              onClick={(e) => {
                handleClear(e);
              }}
            >
              Clear
            </button>
            {Number(formVal.minAmount) > Number(formVal.maxAmount) && (
              <p style={{ color: "red" }}>min amount exceeds max amount</p>
            )}
            <button
              className="submit-btn"
              disabled={Number(formVal.minAmount) > Number(formVal.maxAmount)}
              onClick={(e) => {
                handleSave(e);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnchorPopover;
