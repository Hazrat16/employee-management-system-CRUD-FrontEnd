export const employeeListApiRoutes = "http://localhost:8080/api/v1/employees";
export const addEmployeeApiRoutes = "http://localhost:8080/api/v1/add-employee";
export const editEmployeeApiRoutes = (id: number) =>
  `http://localhost:8080/api/v1/employee/${id}`;
export const updateEmployeeApiRoutes = (id: number) =>
  `http://localhost:8080/api/v1/update/${id}`;
export const deleteEmployeeApiRoutes = (id: number) =>
  `http://localhost:8080/api/v1/delete/${id}`;
