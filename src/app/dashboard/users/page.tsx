"use client"
import Dropdown from '@/components/common/Dropdown';
import { useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  role: number;
  identity: number;
  email: string;
}

const initialUsers: User[] = [{
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john@gmail.com',
  role: 1,
  identity: 1
},

{
  id: 2,
  firstName: 'Alejandro',
  lastName: 'Doe',
  age: 30,
  email: 'john@gmail.com',
  role: 1,
  identity: 1
}
];

const roles: any[] = [{
  id: 1,
  name: 'Admin'
},

{
    id: 2,
  name: 'User'
}
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newUser, setNewUser] = useState<User>({ id: 0, firstName: '', lastName: '', age: 0, email: '', role: 1, identity: 0 });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ id: 0, firstName: '', lastName: '', age: 0, email: '', role: 1, identity: 0 });
    setModalIsOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditUser = (id: number) => {
    const user = users.find(user => user.id === id);
    if (user) {
      setNewUser(user);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white  ">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-sm-lg p-2 w-1/3"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setUsers(
              initialUsers.filter((user) =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
        <button onClick={() => setModalIsOpen(true)} className="block text-white bg-primary hover:bg-primary/50 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/70 dark:focus:ring-blue-800" type="button">
          Add user
        </button>
      </div>
      <table className="w-full border-collapse rounded-sm-lg">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border py-2">First Name</th>
            <th className="border py-2">Last Name</th>
            <th className="border py-2">Age</th>
            <th className="border py-2">Email</th>
            <th className="border py-2">Identity</th>
            <th className="border py-2">Role</th>
            <th className="border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className='text-center'>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.age}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.identity}</td>
              <td className="border px-4 py-2">
                {user.role === 1 ?
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  border border-green-400">Admin</span>
                  :
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  border border-gray-500">User</span>

                }
              </td>
              {
                user.role === 1 ? 
                <>
                                <td className="border px-4 py-2">
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded-sm-lg hover:text-gray-800" onClick={() => handleEditUser(user.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>

                </button>
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-blue-500 hover:rounded-sm-lg hover:text-white" onClick={() => handleEditUser(user.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </button>
                <button className="bg-transparent text-red  px-2 py-1 hover:bg-red-500 hover:rounded-sm-lg hover:text-white" onClick={() => handleDeleteUser(user.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
                </>
                :
                <td className="border px-4 py-2">
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400">Sin permiso</span>
                </td>
              }

            </tr>
          ))}
        </tbody>
      </table>





      <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={` ${modalIsOpen ? "flex" : "hidden"}
       overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-sm-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-sm-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {newUser.id === 0 ? "Create New User" : "Edit User"}
          </h3>
          <button type="button" onClick={() => setModalIsOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={(e) => {
          e.preventDefault();
          if (newUser.id === 0) {
            handleAddUser();
          } else {
            setUsers(users.map(user => user.id === newUser.id ? newUser : user));
            setNewUser({ id: 0, firstName: '', lastName: '', age: 0, email: '', role: 1, identity: 0 });
            setModalIsOpen(false);
          }
        }}>
            <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input type="text" name="firstName" id="firstName" value={newUser.firstName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type first name" required={true} />
            </div>
            <div className="col-span-2">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={newUser.lastName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type last name" required={true} />
            </div>
            <div className="col-span-2 sm:col-span-1">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
          <input type="number" name="age" id="age" value={newUser.age} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Age" required={true} />
            </div>
            <div className="col-span-2 sm:col-span-1">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" name="email" id="email" value={newUser.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required={true} />
            </div>
            <div className="col-span-2 sm:col-span-1">
          <label htmlFor="identity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identity</label>
          <input type="number" name="identity" id="identity" value={newUser.identity} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Identity" required={true} />
            </div>
            <div className="col-span-2 sm:col-span-1">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <Dropdown options={roles} selected={newUser.role} action={"Selected role"} onClickOption={(selectedRole:any) => setNewUser({ ...newUser, role: selectedRole.id })} />
            </div>
            </div>
          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
            {newUser.id === 0 ? "Add new user" : "Update user"}
          </button>
        </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UsersPage;
