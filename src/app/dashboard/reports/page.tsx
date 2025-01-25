"use client"

import React, { useState } from 'react';

interface Report {
  id: number;
  typeOfIncident: string;
  incident: string;
  dateIncident: string;
  secOfficer: string;
  comments: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    typeOfIncident: 'Theft',
    incident: 'Stolen laptop',
    dateIncident: '2023-10-01',
    secOfficer: 'John Doe',
    comments: 'Reported to police',
  },
  {
    id: 2,
    typeOfIncident: 'Vandalism',
    incident: 'Broken window',
    dateIncident: '2023-10-02',
    secOfficer: 'Jane Smith',
    comments: 'Security footage reviewed',
  },
  // Add more reports as needed
];

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [newReport, setNewReport] = useState<Report>({ id: 0, typeOfIncident: '', incident: '', dateIncident: '', secOfficer: '', comments: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleAddReport = () => {
    setReports([...reports, { ...newReport, id: reports.length + 1 }]);
    setNewReport({ id: 0, typeOfIncident: '', incident: '', dateIncident: '', secOfficer: '', comments: '' });
    setModalIsOpen(false);
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleEditReport = (id: number) => {
    const report = reports.find(report => report.id === id);
    if (report) {
      setNewReport(report);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Report Management</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search reports..."
          className="border rounded-lg p-2 w-1/3"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setReports(
              initialReports.filter((report) =>
                `${report.typeOfIncident} ${report.incident}`.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
        <button onClick={() => setModalIsOpen(true)} className="block text-white bg-primary hover:bg-primary/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/70 dark:focus:ring-blue-800" type="button">
          Add Report
        </button>
      </div>
      <table className="w-full border-collapse rounded-lg">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border py-2">ID</th>
            <th className="border py-2">Type of Incident</th>
            <th className="border py-2">Incident</th>
            <th className="border py-2">Date of Incident</th>
            <th className="border py-2">Security Officer</th>
            <th className="border py-2">Comments</th>
            <th className="border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id} className='text-center'>
              <td className="border px-4 py-2">{report.id}</td>
              <td className="border px-4 py-2">{report.typeOfIncident}</td>
              <td className="border px-4 py-2">{report.incident}</td>
              <td className="border px-4 py-2">{report.dateIncident}</td>
              <td className="border px-4 py-2">{report.secOfficer}</td>
              <td className="border px-4 py-2">{report.comments}</td>
              <td className="border px-4 py-2">
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded-lg hover:text-gray-800" onClick={() => handleEditReport(report.id)}>
                  Edit
                </button>
                <button className="bg-transparent text-red-500 px-2 py-1 hover:bg-red-500 hover:rounded-lg hover:text-white" onClick={() => handleDeleteReport(report.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={` ${modalIsOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {newReport.id === 0 ? "Create New Report" : "Edit Report"}
              </h3>
              <button type="button" onClick={() => setModalIsOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={(e) => {
              e.preventDefault();
              if (newReport.id === 0) {
                handleAddReport();
              } else {
                setReports(reports.map(report => report.id === newReport.id ? newReport : report));
                setNewReport({ id: 0, typeOfIncident: '', incident: '', dateIncident: '', secOfficer: '', comments: '' });
                setModalIsOpen(false);
              }
            }}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="typeOfIncident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Incident</label>
                  <input type="text" name="typeOfIncident" id="typeOfIncident" value={newReport.typeOfIncident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type of Incident" required={true} />
                </div>
                <div className="col-span-2">
                  <label htmlFor="incident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Incident</label>
                  <input type="text" name="incident" id="incident" value={newReport.incident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Incident" required={true} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="dateIncident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Incident</label>
                  <input type="date" name="dateIncident" id="dateIncident" value={newReport.dateIncident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required={true} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="secOfficer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Officer</label>
                  <input type="text" name="secOfficer" id="secOfficer" value={newReport.secOfficer} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Security Officer" required={true} />
                </div>
                <div className="col-span-2">
                  <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                  <input type="text" name="comments" id="comments" value={newReport.comments} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Comments" required={true} />
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                {newReport.id === 0 ? "Add new report" : "Update report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
  