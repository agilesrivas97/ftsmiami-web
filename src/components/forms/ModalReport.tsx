import React from "react";
import { useState } from "react";
import { Report } from "@/types/report";

interface ModalReportProps {
  open: boolean;
  report: Report;
  handleEditReport: (report: Report) => void;
  handleModalClose: () => void;
  setOpen: (open: boolean) => void;
}

const initialReport: Report = {
  id: 0,
  case_number:'',
  type_incident: '',
  incident: '',
  date_incident: '',
  time_incident: '',
  officer_name: '',
  complainants: [],
  victims: [],
  suspects: [],
  witnesses: []
};

const ModalReport: React.FC<ModalReportProps> = (props) => {
  const { report } = props;
  const [newReport, setNewReport] = useState<Report>(initialReport);

  React.useEffect(() => {
    if (report) {
      setNewReport(props.report);
    }
  }, [report]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleEditReport(newReport);
    props.setOpen(false);
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className={` ${props.open ? "flex" : "hidden"}
        overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full h-full inset-0`}>
    
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-black rounded-2xl shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-sm-t ">
            <h3 className="text-lg font-semibold text-white">
              {!report ? "Create New Report" : "Edit Report"}
            </h3>
            <button
              type="button"
              onClick={() => {
                props.setOpen(false);
                setNewReport(report);
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="narrative"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Narrative
                </label>
                <textarea
                  name="narrative"
                  id="narrative"
                  value={newReport.narrative}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Narrative"
                  required={true}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="supervisor_comments"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Comments by supervisor
                </label>
                <textarea
                  name="supervisor_comments"
                  id="supervisor_comments"
                  value={newReport.supervisor_comments}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Narrative"
                  required={true}
                />
              </div>
            </div>
            <button className="text-white rounded-3xl inline-flex items-center bg-primary hover:bg-primary/50 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-sm-lg text-sm px-5 py-2.5 text-center">
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {newReport.id === 0 ? "Add new report" : "Update report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalReport;


