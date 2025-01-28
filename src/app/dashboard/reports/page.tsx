"use client"

import React, { useState } from 'react';
import { useEffect } from 'react';

interface Report {
  id: number;
  type_incident: string;
  incident: string;
  date_incident: string;
  time_incident: string;
  at_time_incident?: boolean;
  delayed_person?: boolean;
  delayed_telephone?: boolean;
  reason_delay?: string;
  authorities_notified?: boolean;
  by_whom?: string;
  type_assistance?: string;
  vehicule?: string;
  time_arrival?: string;
  report_case?: string;
  location?: string;
  type_premises?: string;
  exact_location_incident?: string;
  client_notified?: boolean;
  time_notified?: string;
  who_notified?: string;
  manager_notified?: boolean;
  time_manager_notified?: string;
  witness_incident?: boolean;
  area_of_incident?: boolean;
  date_sec_officer?: string;
  time_sec_officer?: string;
  photographs_taken_area?: boolean;
  present_location?: string;
  any_hazard_time_inspection?: boolean;
  narrative?: string;
  officer_name: string;
  date_reporting_officer?: string;
  reviewed_supervisor?: string;
  supervisor_comments?: string;
  date_reviewed?: string;
  complainants?: any[];
  victims?: any[];
  suspects?: any[];
  witnesses?: any[];
}


const initialReports: Report[] = [];
const URL_API_REPORTS = 'http://localhost:8000/api';

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [newReport, setNewReport] = useState<Report>({ id: 0, type_incident: '', incident: '', date_incident: '',time_incident:'', officer_name: '', supervisor_comments: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);
      const response = await fetch(URL_API_REPORTS + "/reports", { headers });
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleAddReport = () => {
    setReports([...reports, { ...newReport, id: reports.length + 1 }]);
    setNewReport({ id: 0, type_incident: '', incident: '', date_incident: '',time_incident:'', officer_name: '', supervisor_comments: '' });
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
    <div className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Report Management</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search reports..."
          className="border rounded-sm-lg p-2 w-1/3"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setReports(
              initialReports.filter((report) =>
                `${report.type_incident} ${report.incident}`.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
      </div>
      <table className="w-full border-collapse rounded-sm-lg">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border py-2">ID</th>
            <th className="border py-2">Type of Incident</th>
            <th className="border py-2">Incident</th>
            <th className="border py-2">Date of Incident</th>
            <th className="border py-2">Security Officer</th>
            <th className="border py-2">Narrative</th>
            <th className="border py-2">Comments</th>
            <th className="border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id} className='text-center'>
              <td className="border px-4 py-2">{report.id}</td>
              <td className="border px-4 py-2">{report.type_incident}</td>
              <td className="border px-4 py-2">{report.incident}</td>
              <td className="border px-4 py-2">{report.date_incident} {report.time_incident}</td>
              <td className="border px-4 py-2">{report.officer_name}</td>
              <td className="border px-4 py-2 max-w-xs break-words">{report.narrative}</td>
              <td className="border px-4 py-2">{report.supervisor_comments}</td>
              <td className="border px-4 py-2">
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded-sm-lg hover:text-gray-800" onClick={() => {}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>

                </button>
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-blue-500 hover:rounded-sm-lg hover:text-white" onClick={() => {}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </button>
                <button className="bg-transparent text-red  px-2 py-1 hover:bg-red-500 hover:rounded-sm-lg hover:text-white" onClick={() => {}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={` ${modalIsOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-sm-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-sm-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {newReport.id === 0 ? "Create New Report" : "Edit Report"}
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
              if (newReport.id === 0) {
                handleAddReport();
              } else {
                setReports(reports.map(report => report.id === newReport.id ? newReport : report));
                setNewReport({ id: 0, type_incident: '', incident: '', date_incident: '',time_incident:'', officer_name: '', supervisor_comments: '' });
                setModalIsOpen(false);
              }
            }}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="typeOfIncident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Incident</label>
                  <input type="text" name="typeOfIncident" id="typeOfIncident" value={newReport.type_incident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type of Incident" required={true} />
                </div>
                <div className="col-span-2">
                  <label htmlFor="incident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Incident</label>
                  <input type="text" name="incident" id="incident" value={newReport.incident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Incident" required={true} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="dateIncident" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Incident</label>
                  <input type="date" name="dateIncident" id="dateIncident" value={newReport.date_incident} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required={true} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="secOfficer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Officer</label>
                  <input type="text" name="secOfficer" id="secOfficer" value={newReport.officer_name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Security Officer" required={true} />
                </div>
                <div className="col-span-2">
                  <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                  <input type="text" name="comments" id="comments" value={newReport.supervisor_comments} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Comments" required={true} />
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
  