"use client";
import ModalCompany from "@/components/forms/ModalCompany";
import { createCompany, deleteCompany, getCompanies, getCompanyById, updateCompany } from "@/services/company_service";
import { Company } from "@/types/company";
import { User } from "@/types/user";

import { useState } from "react";
import { useEffect } from "react";

const initialCompany: Company[] = [];

const CompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompany);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(initialCompany);
  const [auth, setAuth] = useState<User>();
  const [companySelected, setCompanySelected] = useState<Company | any>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const unhautorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  }

  const loadCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
     
      const data = await getCompanies(token);
      setCompanies(data);
      setFilteredCompanies(data);
      const user = localStorage.getItem("user");
      if (user) {
        setAuth(JSON.parse(user));
      }
    } catch (error) {
      if (error instanceof Error ) {
        unhautorized();
        console.log(error, "mens");
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    }
  };

  const onShowCompany = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await getCompanyById(id, token);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } 
  };

  const handleAddCompany = async (newCompany: Company) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await createCompany(newCompany, token);
      setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } finally {
      await loadCompanies();
    } 

  };

  const handleDeleteCompany = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await deleteCompany(id, token);
      setCompanies(companies.filter((user) => user.id !== id));
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } finally {
      await loadCompanies();
    }
  };

  const handleEditUser = async (newCompany: Company) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await updateCompany(newCompany.id, {...newCompany,}, token);
      setCompanies(companies.map((company) => (company.id === newCompany.id ? newCompany : company)));
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    }finally {
      await loadCompanies();
    } 


  };

  const onClickUpdatedCompany = (id: number) => {
    const company = companies.find((company) => company.id === id);
    if (company) {
      setModalIsOpen(true);
      setCompanySelected(company);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white  ">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search companies..."
          className="border rounded-sm-lg p-2 w-1/3"
          onChange={(e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = companies.filter((company) =>
          `${company.name}`.toLowerCase().includes(searchTerm)
        );
        setFilteredCompanies(filteredUsers);
          }}
        />

        
        <div className="flex w-1/3 justify-end space-x-4 gap-4">
          <button
        onClick={loadCompanies}
        className="text-white bg-primary hover:bg-primary/50 focus:ring-4 rounded-md focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/70 dark:focus:ring-blue-800"
        type="button"
          >
        Refresh
          </button>
          <button
        onClick={() => setModalIsOpen(true)}
        className="text-white bg-primary hover:bg-primary/50 focus:ring-4 rounded-md focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/70 dark:focus:ring-blue-800"
        type="button"
          >
        Add Company
          </button>
        </div>
      </div>
     <div className="overflow-x-auto"> 
     <table className="w-full border-collapse rounded-sm-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border py-2">Name</th>
            <th className="border py-2">Email</th>
            <th className="border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              {auth && auth.id_role === 1 ? (
                <>
                  <td className="border px-4 py-2">
                    <button
                                        type="button"
                      className="hidden bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded-4xl hover:text-gray-800"
                      onClick={() => onShowCompany(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                      </svg>
                    </button>
                    <button
                                        type="button"
                      className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-blue-500 hover:rounded hover:text-white"
                      onClick={() => onClickUpdatedCompany(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                    type="button"
                      className="bg-transparent text-red  px-2 py-1 hover:bg-red-500 hover:rounded hover:text-white"
                      onClick={() => handleDeleteCompany(user.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 font-bold"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </>
              ) : (
                <td className="border px-4 py-2">
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 hover:rounded-4xl border border-red-400">
                    Sin permiso
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
     </div>

      <ModalCompany
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        handleAddCompany={handleAddCompany}
        handleEditCompany={handleEditUser}
        handleModalClose={() => {setModalIsOpen(false); setCompanySelected(null);}}
        company={companySelected}
      />
    </div>
  );
};

export default CompanyPage;
