
"use client"
import { Bar,Pie } from 'react-chartjs-2';
  import { useEffect, useState } from 'react';

import 'chart.js/auto';
import { getSummary } from '@/services/report_service';
import { Summary } from '@/types/summary';



const DashboardPage: React.FC = () => {
  

  const [summary, setSummary] = useState<Summary>({
    total_security_users: 0,
    reports_without_comments: 0,
    reports_with_comments: 0,
    total_reports_month: 0,
    total_reports_anual: 0
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const data: Summary = await getSummary(token)
      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };


  const employeesByWorkspace = [
    { workspace: 'Workspace A', employees: 10 },
    { workspace: 'Workspace B', employees: 11 },
    { workspace: 'Workspace C', employees: 8 },
  ];

  const employeeData = {
    labels: employeesByWorkspace.map((workspace) => workspace.workspace),
    datasets: [
      {
        label: 'Employees',
        data: employeesByWorkspace.map((workspace) => workspace.employees),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Incidentes Mensuales', 'Incidentes Anuales'],
    datasets: [
      {
        data: [summary.total_reports_month, summary.total_reports_anual],
        backgroundColor: ['#074799', '#842c30'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="p-4 text-black">
      <div className="mb-4">
        <div className="report-cards flex justify-between">
            <div className="card bg-primary w-1/3">
                <p className="tip">Month incidents</p>
                <p className="second-text">{summary.total_reports_month}</p>
            </div>
            <div className="card  w-1/3" style={{ backgroundColor: "#E16A54" }}>
                <p className="tip">Without comments</p>
                <p className="second-text">{summary.reports_without_comments}</p>
            </div>
            <div className="card w-1/3" style={{ backgroundColor: "#074799" }}>
                <p className="tip">Employees register</p>
                <p className="second-text">{summary.total_security_users}</p>
            </div>
            <div className="card w-1/3" style={{ backgroundColor: "#4B5945" }}>
                <p className="tip">Send Reports</p>
                <p className="second-text">{summary.reports_with_comments}</p>
            </div>

        </div>
      </div>

      <div className="flex flex-wrap justify-center -mx-2 my-30">
        <div className=" hidden w-[30%]  px-2 mb-4">
          <h2 className="text-xl font-semibold">Reportes de Incidentes</h2>
          <Bar data={employeeData} width={100} height={100} />
        </div>
        <div className="w-[30%] px-2 mb-4">
        <h2 className="text-xl text-center font-semibold">Incidents Distribution</h2>
        <Pie data={pieData} width={100} height={100}/>
      </div>
      <div className=" hidden w-[30%] px-2 mb-4">
          <h2 className="text-xl font-semibold">Reportes de Empleados</h2>
          <Bar data={employeeData} width={100} height={100}/>
        </div>
      </div>


    </div>
  );
};

export default DashboardPage;