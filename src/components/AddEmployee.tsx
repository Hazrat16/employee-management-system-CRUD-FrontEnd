import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { employeePageRoute } from "./AppRoute";
export interface IEmployeeProps {
  firstName: string;
  lastName: string;
  email: string;
  id?: number;
}

export const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEmployeeProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  console.log(watch("firstName"));
  const [employeeData, setEmployeeData] = useState<IEmployeeProps>({
    firstName: "",
    lastName: "",
    email: "",
  });
  console.log(employeeData);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const hasParams = id !== undefined;

  console.log(hasParams);

  useEffect(() => {
    if (hasParams) {
      getEmployeeById(Number(id))
        .then((response) => {
          console.log(response.data);
          setEmployeeData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, hasParams]);

  const onSubmit: SubmitHandler<IEmployeeProps> = (employee) => {
    if (id) {
      updateEmployee(Number(id), employee)
        .then((response: AxiosResponse) => {
          console.log(response.data);
          navigate(employeePageRoute);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      createEmployee(employee)
        .then((response: AxiosResponse) => {
          console.log(response.data);
          navigate(employeePageRoute);
        })
        .catch((error) => {
          console.error("Error creating employee:", error);
        });
    }
  };
  return (
    <div className="container mx-auto p-4  ">
      <h2 className="text-3xl font-semibold dark:text-white mt-3">
        {hasParams ? "Edit Employee " : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block  text-gray-700 text-xl font-bold mb-2 mt-5"
          htmlFor="grid-first-name"
        >
          First Name
        </label>
        <input
          {...register("firstName", { required: true, maxLength: 10 })}
          style={{ border: "1px solid black" }}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          value={employeeData.firstName}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, firstName: e.target.value })
          }
        />
        {errors.firstName && employeeData.firstName.length === 0 && (
          <p className=" text-red-500 ">This field is required</p>
        )}

        <label
          className="block  text-gray-700 text-xl font-bold mb-2 mt-5"
          htmlFor="grid-last-name"
        >
          Last Name
        </label>
        <input
          {...register("lastName", { required: true, maxLength: 10 })}
          style={{ border: "1px solid black" }}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          value={employeeData.lastName}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, lastName: e.target.value })
          }
        />
        {errors.lastName && employeeData.lastName.length === 0 && (
          <p className=" text-red-500 ">This field is required</p>
        )}

        <label
          className="block  text-gray-700 text-xl font-bold mb-2 mt-5"
          htmlFor="grid-email"
        >
          Email{" "}
        </label>
        <input
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (v) => /^\S+@\S+\.\S+$/.test(v),
            },
          })}
          style={{ border: "1px solid black" }}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          value={employeeData.email}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, email: e.target.value })
          }
        />
        {errors.email && employeeData.email.length === 0 && (
          <p className=" text-red-500 ">This field is required</p>
        )}

        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
