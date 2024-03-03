import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { addEmployeePageRoute, editEmployeePageRoute } from "./AppRoute";

interface EmployeeProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const ListEmployeeComponent = () => {
  const [employee, setEmployee] = useState<EmployeeProps[]>([]);
  const navigate = useNavigate();

  const getAllListEmployee = () => {
    listEmployees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddUser = () => {
    navigate(addEmployeePageRoute);
  };

  const updateEmployee = (id: number) => {
    navigate(`${editEmployeePageRoute}/${id}`);
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_response) => {
        getAllListEmployee();
      })
      .catch((error) => {
        console.error("Deletion is not performed", error);
      });
  };

  useEffect(() => {
    getAllListEmployee();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold my-5">List of employees</h2>
      <button
        type="button"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onClick={handleAddUser}
      >
        <FontAwesomeIcon icon={faUserPlus} /> Add Employee
      </button>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr
              key={employee.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {employee.id}
              </th>
              <td className="px-6 py-4">{employee.firstName}</td>
              <td className="px-6 py-4">{employee.lastName}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>{" "}
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
