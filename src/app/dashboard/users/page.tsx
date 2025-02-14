"use client";
import ModalUser from "@/components/forms/ModalUser";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@/services/user_service";
import { User } from "@/types/user";

import { useState } from "react";
import { useEffect } from "react";

const initialUsers: User[] = [];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [auth, setAuth] = useState<User>();
  const [userSelected, setUserSelected] = useState<User | any>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const unhautorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  }

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
     
      const data = await getUsers(token);
      setUsers(data);
      setFilteredUsers(data);
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

  const onShowUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await getUserById(id, token);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } 
  };

  const handleAddUser = async (newUser: User) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await createUser(newUser, token);
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } finally {
      await loadUsers();
    } 

  };

  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await deleteUser(id, token);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    } finally {
      await loadUsers();
    }
  };

  const handleEditUser = async (newUser: User) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await updateUser(newUser.id, {...newUser, password_confirmed: newUser.password}, token);
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Invalid token")) {
        unhautorized();
      } else {
        console.error("An unknown error occurred");
        console.log(error);
      }
    }finally {
      await loadUsers();
    } 


  };

  const onClickUpdatedUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setModalIsOpen(true);
      setUserSelected(user);
    }
  };

  const getRole = (id_role: number) => {
    if (id_role === 1) {
      return ( <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm  border border-green-400">
        Administrator
      </span>); 
    } else if(id_role === 2) {
      return ( <span className="bg-red-400 text-white text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm  border border-red-400">
        Manager
      </span>); 
    } else if(id_role === 3) {
      return ( <span className="bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm  border border-blue-400">
        Staff
      </span>); 
    } else {
      return ( <span className="bg-gray-100 text-black text-xs font-medium me-2 px-2.5 py-1.5 rounded-sm  border border-gray-400">
        Securities
      </span>); 
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white  ">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-sm-lg p-2 w-1/3"
          onChange={(e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter((user) =>
          `${user.name}`.toLowerCase().includes(searchTerm)
        );
        setFilteredUsers(filteredUsers);
          }}
        />

        
        <div className="flex w-1/3 justify-end space-x-4 gap-4">
          <button
        onClick={loadUsers}
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
        Add user
          </button>
        </div>
      </div>
      <table className="w-full border-collapse rounded-sm-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border py-2">Name</th>
            <th className="border py-2">Email</th>
            <th className="border py-2">Role</th>
            <th className="border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {getRole(user.id_role)}
              </td>
              {auth && auth.id_role === 1 ? (
                <>
                  <td className="border px-4 py-2">
                    <button
                                        type="button"
                      className="hidden bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded-4xl hover:text-gray-800"
                      onClick={() => onShowUser(user.id)}
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
                      onClick={() => onClickUpdatedUser(user.id)}
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
                      onClick={() => handleDeleteUser(user.id)}
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

      <ModalUser
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        handleAddUser={handleAddUser}
        handleEditUser={handleEditUser}
        handleModalClose={() => {setModalIsOpen(false); setUserSelected(null);}}
        user={userSelected}
      />
    </div>
  );
};

export default UsersPage;
