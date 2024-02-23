import { createContext, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import { customersJSON } from "./constants/CustomersJSON";
import "./App.css";


export const initialState = {
  toggle: {
    checked: true,
    name: true,
    checked: true,
    email: true,
    createdAt: true,
    dueDate: true,
    amount: true,
    status: true,
  },
  sort: {
   keyToSort: '',
   direction: ''
  },
  formVal:{
    minAmount: 0,
    maxAmount: 0,
    createdAt: "",
    dueDate: "",
    status: "",
  }
};
export const TableManagementContext = createContext();
function App() {
  const [tableManagementState, setTableManagementState] = useState(
    initialState
  );
  return (
    <TableManagementContext.Provider
      value={[tableManagementState, setTableManagementState]}
    >
      <div className="App">
        <div className="table">
          <Header />
          <Table obj={customersJSON} />
        </div>
      </div>
    </TableManagementContext.Provider>
  );
}

export default App;
