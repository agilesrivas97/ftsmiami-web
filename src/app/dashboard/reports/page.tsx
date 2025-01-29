"use client"

import ModalReport from '@/components/forms/ModalReport';
import { deleteReport, getReportByid, getReports, updateReport } from '@/services/report_service';
import { Report } from '@/types/report';
import { User } from '@/types/user';
import React, { useState } from 'react';
import { useEffect } from 'react';


const initialReports: Report[] = [];

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [newReport, setNewReport] = useState<Report>({ id: 0, type_incident: '', incident: '', date_incident: '',time_incident:'', officer_name: '', supervisor_comments: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredReport, setFilteredReport] = useState<Report[]>(initialReports);
  const [auth, setAuth] = useState<User>();
  const [reportSelected, setReportSelected] = useState<Report | any>();

  useEffect(() => {
    loadReports();
  }, []);

   const unhautorized = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     window.location.href = "/login";
   }
 
   const loadReports = async () => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         throw new Error("No token found");
       }
      
       const data = await getReports(token);
       setReports(data);
       setFilteredReport(data);
       const user = localStorage.getItem("user");
       if (user) {
         setAuth(JSON.parse(user));
       }
     } catch (error) {
       if (error instanceof Error ) {
         unhautorized();
       } else {
         console.error("An unknown error occurred");
         console.log(error);
       }
     }
   };
 
   const onShowReport = async (id: number) => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         throw new Error("No token found");
       }
       await getReportByid(id, token);
     } catch (error) {
       if (error instanceof Error && error.message.includes("Invalid token")) {
         unhautorized();
       } else {
         console.error("An unknown error occurred");
         console.log(error);
       }
     } 
   };
 
   const handleDeleteReport = async (id: number) => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         throw new Error("No token found");
       }
       await deleteReport(id, token);
       setReports(reports.filter((report) => report.id !== id));
     } catch (error) {
       if (error instanceof Error && error.message.includes("Invalid token")) {
         unhautorized();
       } else {
         console.error("An unknown error occurred");
       }
     } finally {
       await loadReports();
     }
   };
 
   const handleEditReport = async (newReport: Report) => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         throw new Error("No token found");
       }
       await updateReport(newReport.id,newReport, token);
       setReports(reports.map((report) => (report.id === newReport.id ? newReport : report)));
       setModalIsOpen(false);
     } catch (error) {
       if (error instanceof Error && error.message.includes("Invalid token")) {
         unhautorized();
       } else {
         console.error("An unknown error occurred");
         console.log(error);
       }
     } finally {
       await loadReports();
     } 
 
 
   };
 
   const onClickUpdatedReport = (id: number) => {
     const report = reports.find((report) => report.id === id);
     if (report) {
       setModalIsOpen(true);
       setReportSelected(report);
     }
   };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search reports..."
          className="border rounded p-2 w-1/3"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredReport = reports.filter((report) =>
              `${report.incident}`.toLowerCase().includes(searchTerm) || `${report.officer_name}`.toLowerCase().includes(searchTerm)
            );
            setFilteredReport(filteredReport);
          }}
        />

          <button
            onClick={loadReports}
            className="block  text-white bg-primary hover:bg-primary/50 focus:ring-4 rounded-md focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary/70 dark:focus:ring-blue-800"
            type="button"
          >
            Refresh
          </button>
      </div>
      <table className="w-full border-collapse rounded-2xl">
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
          {filteredReport.map(report => (
            <tr key={report.id} className='text-center'>
              <td className="border px-4 py-2">{report.id}</td>
              <td className="border px-4 py-2">{report.type_incident}</td>
              <td className="border px-4 py-2">{report.incident}</td>
              <td className="border px-4 py-2">{report.date_incident} {report.time_incident}</td>
              <td className="border px-4 py-2">{report.officer_name}</td>
              <td className="border px-4 py-2 max-w-xs break-words">{report.narrative}</td>
              <td className="border px-4 py-2">{report.supervisor_comments}</td>
              <td className="border px-4 py-2">
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-gray-100 hover:rounded hover:text-gray-800" onClick={() => { onShowReport(report.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>

                </button>
                <button className="bg-transparent text-black px-2 py-1 mr-2 hover:bg-blue-500 hover:rounded hover:text-white" onClick={() => { onClickUpdatedReport(report.id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </button>
                <button className="bg-transparent text-red  px-2 py-1 hover:bg-red-500 hover:rounded hover:text-white" onClick={() => { handleDeleteReport(report.id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

 
      <ModalReport open={modalIsOpen} 
      setOpen={setModalIsOpen} 
      handleModalClose={() => {setModalIsOpen(false); setReportSelected(null);}}
      report={reportSelected} 
      handleEditReport={handleEditReport} />


    </div>
  );
};

export default ReportsPage;
  