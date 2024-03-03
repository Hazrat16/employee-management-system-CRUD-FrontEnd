import axios from "axios";
import { IEmployeeProps } from "../components/AddEmployee";
import {
  addEmployeeApiRoutes,
  deleteEmployeeApiRoutes,
  editEmployeeApiRoutes,
  employeeListApiRoutes,
  updateEmployeeApiRoutes,
} from "../components/ApiRoutes";

export const listEmployees = () => axios.get(employeeListApiRoutes);

export const createEmployee = (employee: IEmployeeProps) => {
  return axios.post(addEmployeeApiRoutes, employee);
};

export const getEmployeeById = (employeeId: number) => {
  return axios.get(editEmployeeApiRoutes(employeeId));
};

export const updateEmployee = (
  employeeId: number,
  employee: IEmployeeProps
) => {
  return axios.put(updateEmployeeApiRoutes(employeeId), employee);
};

export const deleteEmployee = (employeeId: number) => {
  return axios.delete(deleteEmployeeApiRoutes(employeeId));
};
