import { User } from "@/types/user";
import React from "react";
import Dropdown from "../common/Dropdown";
import { useState } from "react";

interface ModalUserProps {
  open: boolean;
  user: User | any;
  handleAddUser: (user: User) => void;
  handleEditUser: (user: User) => void;
  handleModalClose: () => void;
  setOpen: (open: boolean) => void;
}

const roles: any[] = [
  { id: 1, name: "Administrator" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Staff" },
  { id: 4, name: "Securities" },
];

const ModalUser: React.FC<ModalUserProps> = (props) => {
  const { user } = props;
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    id_role: 0,
    password_confirmed: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (props.user) {
      setNewUser(props.user);
    }
  }, [props.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.user) {
      props.handleAddUser({ ...newUser, password_confirmed: newUser.password });
    } else {
      props.handleEditUser(newUser);
      //setUsers(users.map(user => user.id === newUser.id ? newUser : user));
      setNewUser({
        id: 0,
        name: "",
        email: "",
        id_role: 0,
        password: "",
        password_confirmed: "",
      });
      props.setOpen(false);
    }
  };

  const handleDropdownChange = (selectedRole: any) => {
    setNewUser({ ...newUser, id_role: selectedRole.id });
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={` ${props.open ? "flex" : "hidden"}
        overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full h-full inset-0`}>
    
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-black rounded-2xl shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-sm-t ">
            <h3 className="text-lg font-semibold text-white">
              {!user ? "Create New User" : "Edit User"}
            </h3>
            <button
              type="button"
              onClick={() => {
                props.setOpen(false);
                setNewUser({
                  id: 0,
                  name: "",
                  email: "",
                  id_role: 0,
                  password: "",
                  password_confirmed: "",
                });
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type name"
                  required={true}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                  required={true}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Password"
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 9a9 9 0 100-18 9 9 0 000 18z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.6M4.22 4.22l15.56 15.56M9.88 9.88a3 3 0 014.24 4.24"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <Dropdown
                  options={roles}
                  selected={newUser.id_role}
                  action={"Selected role"}
                  onClickOption={handleDropdownChange}
                />
              </div>
            </div>
            <button className="text-white rounded-3xl inline-flex items-center bg-primary hover:bg-primary/50 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center">
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {newUser.id === 0 ? "Add new user" : "Update user"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
