
"use client"
import { Bar,Pie } from 'react-chartjs-2';

import 'chart.js/auto';



const DashboardPage: React.FC = () => {
  
  const pdfReports = 120;
  const incidentsLastMonth = 5;
  const incidentsLastYear = 45;
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
        data: [incidentsLastMonth, incidentsLastYear],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="p-4 text-black">
      <div className="mb-4">
        <div className="report-cards flex justify-between">
            <div className="card red w-1/3">
                <p className="tip">Incidentes mensuales</p>
                <p className="second-text">PDF Reports Generated: {pdfReports}</p>
            </div>
            <div className="card blue w-1/3">
                <p className="tip">Reportes sin comentarios</p>
                <p className="second-text">{incidentsLastMonth}</p>
            </div>
            <div className="card green w-1/3">
                <p className="tip">Reportes finalizados</p>
                <p className="second-text">Lorem Ipsum</p>
            </div>
            <div className="card green w-1/3">
                <p className="tip">Empleados registrados</p>
                <p className="second-text">Lorem Ipsum</p>
            </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center -mx-2 my-30">
        <div className="w-[30%]  px-2 mb-4">
          <h2 className="text-xl font-semibold">Reportes de Incidentes</h2>
          <Bar data={employeeData} width={100} height={100} />
        </div>
        <div className="w-[30%] px-2 mb-4">
        <h2 className="text-xl font-semibold">Distribución de Incidentes</h2>
        <Pie data={pieData} width={100} height={100}/>
      </div>
      <div className="w-[30%] px-2 mb-4">
          <h2 className="text-xl font-semibold">Reportes de Empleados</h2>
          <Bar data={employeeData} width={100} height={100}/>
        </div>
      </div>


    </div>
  );
};

export default DashboardPage;