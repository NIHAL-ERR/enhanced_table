import React, { useState, useEffect, useContext } from "react";
import "./table.css";
import { convertDate } from "../../utils/dateUtils";
import { AiOutlineSortAscending } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineSortDescending } from "react-icons/ai";
import AnchorPopover from "../Popover/TogglePopover";
import { togglePopoverarr } from "../../constants/TogglePopoverContent";
import { TableManagementContext } from "../../App";
import { initialState } from "../../App";

export default function Table({ obj }) {
  const [filteredArr, setFilterededArr] = useState(obj);
  const [filteredToggledPopoverArr, setFilteredToggledPopoverArr] =
    useState(togglePopoverarr);
  const [tableManagementState, setTableManagementState] = useContext(
    TableManagementContext
  );
  const sortMethod = (item, sortType) => {
    let sortedCustomers = [...filteredArr];
    sortedCustomers.sort((a, b) => {
      const valA = a[item];
      const valB = b[item];
      if (item !== "createdAt" || item !== "dueDate") {
        if (sortType == "asc" ? valA < valB : valA > valB) {
          return -1;
        }
        if (sortType == "asc" ? valA > valB : valA < valB) {
          return 1;
        }
        return 0;
      } else {
        return valA - valB;
      }
    });

    setFilterededArr(sortedCustomers);
  };
  const handleSort = (item) => {
    let sortTempObj;
    sortTempObj = {
      keyToSort: item,
      direction:
        item === tableManagementState.sort.keyToSort
          ? tableManagementState.sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    };
    setTableManagementState({ ...tableManagementState,sort:initialState , sort: sortTempObj});
    sortMethod(item, tableManagementState.sort.direction);
  };

  useEffect(() => {
    //Column toggle
    const keysToRemove = Object.entries(tableManagementState.toggle)
      .filter(([key, value]) => value === false)
      .map(([key]) => key);
    const keysToShow = Object.entries(tableManagementState.toggle)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
    const updatedCustomersJSON = obj.map((customer) => {
      const updatedCustomer = { ...customer };
      keysToRemove.forEach((key) => delete updatedCustomer[key]);
      return updatedCustomer;
    });

    setFilterededArr(updatedCustomersJSON);
    //
    //header toggle
    setFilteredToggledPopoverArr(keysToShow);
    //
  }, [tableManagementState.toggle]);
  useEffect(() => {
    // Destructuring formVal from initialState
    const { formVal } = tableManagementState;
    setTableManagementState(
      {
        ...tableManagementState,
        sort:{
          keyToSort: '',
          direction: ''
        }
      }
    )
    // Filtering the obj array based on the criteria in formVal
    const filteredObj = obj.filter((item) => {
      // Check if the item's properties match the criteria in formVal
      const createdAtMatch = formVal.createdAt
        ? new Date(item.createdAt).getDate() ==
          new Date(formVal.createdAt).getDate()
        : true;
      const dueDateMatch = formVal.dueDate
        ? new Date(item.dueDate).getDate() ==
          new Date(formVal.dueDate).getDate()
        : true;
      const statusMatch = formVal.status
        ? item.status === formVal.status
        : true;
      const minAmountMatch =
        (formVal.minAmount && formVal.maxAmount) ||
        (formVal.minAmount == 0 && formVal.maxAmount)
          ? item.amount >= formVal.minAmount && item.amount <= formVal.maxAmount
          : true;
      return createdAtMatch && dueDateMatch && statusMatch && minAmountMatch;
    });
  
    setFilterededArr(filteredObj)
  }, [tableManagementState.formVal]);
  return (
    <>
      <table>
        <tr>
          {filteredToggledPopoverArr.includes("checked") && (
            <th>
              <input type="checkbox" />
            </th>
          )}
          {filteredToggledPopoverArr.map((item, index) => {
            if (item !== "checked")
              return (
                <th
                  onClick={() => {
                    handleSort(item);
                  }}
                  style={{
                    background:
                      tableManagementState.sort.keyToSort === item &&
                      "#2c9f45",
                  }}
                >
                  {item}
                  {tableManagementState.sort.keyToSort === item &&
                    tableManagementState.sort.direction === "asc" && (
                      <AiOutlineSortAscending />
                    )}
                  {tableManagementState.sort.keyToSort === item &&
                    tableManagementState.sort.direction === "desc" && (
                      <AiOutlineSortDescending />
                    )}
                </th>
              );
          })}
        </tr>
        {filteredArr?.map((item, index) => (
          <tr>
            {item.checked && (
              <td>
                <input type="checkbox" />
              </td>
            )}
            {item.name && (
              <td className="avatar-container">
                <div class="avatar">
                  <RxAvatar size={50} />
                </div>
                <div class="customer-name">{item.name}</div>
              </td>
            )}
            {item.email && <td>{item.email}</td>}
            {item.createdAt && <td>{convertDate(item.createdAt)}</td>}
            {item.dueDate && <td>{convertDate(item.dueDate)}</td>}
            {item.amount && <td>{item.amount}</td>}
            {item.status && <td>{item.status}</td>}
          </tr>
        ))}
      </table>
      <AnchorPopover />
    </>
  );
}
