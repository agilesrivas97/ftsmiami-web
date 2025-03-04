import React from "react";
import Dropdown from "../common/Dropdown";
import { useState } from "react";
import { Company } from "@/types/company";

interface ModalUserProps {
  open: boolean;
  company: Company | any;
  handleAddCompany: (company: Company) => void;
  handleEditCompany: (company: Company) => void;
  handleModalClose: () => void;
  setOpen: (open: boolean) => void;
}


const ModalCompany: React.FC<ModalUserProps> = (props) => {
  const { company } = props;
  const [newCompany, setNewCompany] = useState<Company>({
    id: 0,
    name: "",
    email: ""
  });

  React.useEffect(() => {
    if (props.company) {
      setNewCompany(props.company);
    }
  }, [props.company]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.company) {
      props.handleAddCompany({ ...newCompany});
    } else {
      props.handleEditCompany(newCompany);
      //setUsers(users.map(user => user.id === newCompany.id ? newCompany : user));
      setNewCompany({
        id: 0,
        name: "",
        email: ""
      });
      props.setOpen(false);
    }
  };


  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className={` ${props.open ? "flex" : "hidden"}
        overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full h-full inset-0`}>
    
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-black rounded-2xl shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-sm-t ">
            <h3 className="text-lg font-semibold text-white">
              {!company ? "Create New Company" : "Edit Company"}
            </h3>
            <button
              type="button"
              onClick={() => {
                props.setOpen(false);
                setNewCompany({
                  id: 0,
                  name: "",
                  email: ""
                });
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
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
                  value={newCompany.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Commpany name"
                  required={true}
                />
              </div>

              <div className="col-span-2">
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
                  value={newCompany.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                  required={true}
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
              {newCompany.id === 0 ? "Add new Company" : "Update Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCompany;
