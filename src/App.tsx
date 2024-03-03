import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AddEmployee } from "./components/AddEmployee";
import { Header } from "./components/Header";
import { ListEmployeeComponent } from "./components/ListEmployeeComponent";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListEmployeeComponent />}></Route>
        <Route path="/employees" element={<ListEmployeeComponent />}></Route>
        <Route path="/add-employee" element={<AddEmployee />}></Route>
        <Route path="/edit-employee/:id" element={<AddEmployee />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
