
"use client"
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const DashboardPage: React.FC = () => {
  // Mock data
  const pdfReports = 120;
  const incidentsLastMonth = 5;
  const incidentsLastYear = 45;
  const employeesByWorkspace = [
    { workspace: 'Workspace A', employees: 10 },
    { workspace: 'Workspace B', employees: 15 },
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Reports</h2>
        <p>PDF Reports Generated: {pdfReports}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Incidents</h2>
        <p>Incidents in the Last Month: {incidentsLastMonth}</p>
        <p>Incidents in the Last Year: {incidentsLastYear}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Employees by Workspace</h2>
        <Bar data={employeeData} />
      </div>
    </div>
  );
};

export default DashboardPage;