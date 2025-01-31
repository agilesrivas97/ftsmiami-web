"use client"

import ReportDropdown from '@/components/common/ReportDropdown';
import ModalReport from '@/components/forms/ModalReport';
import { deleteReport, getLinkTemporal, getReportByid, getReports, updateReport } from '@/services/report_service';
import { Report } from '@/types/report';
import { User } from '@/types/user';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';


const initialReports: Report[] = [];

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [newReport, setNewReport] = useState<Report>({ id: 0, type_incident: '', incident: '', date_incident: '',time_incident:'', officer_name: '', supervisor_comments: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredReport, setFilteredReport] = useState<Report[]>(initialReports);
  const [auth, setAuth] = useState<User>();
  const [reportSelected, setReportSelected] = useState<Report | any>();
  const [openDropdown, setOpenDropdown] = useState<number>(0);

  const toggleDropdown = (id:number) => {
    setOpenDropdown(openDropdown === id ? 0 : id);
  };

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

   const onGeneratedTemporalLink = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const pdf = await getLinkTemporal(id);
      console.log(pdf);
      window.open(pdf.url, '_blank');
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

             <ReportDropdown id={report.id} 
             onClickDropdown={toggleDropdown} 
             selected={openDropdown} 
             onShowPDF={onShowReport}
             onGeneratePDF={onGeneratedTemporalLink}
             handleEdit={onClickUpdatedReport}
             onDeleteReport={handleDeleteReport} />

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
  