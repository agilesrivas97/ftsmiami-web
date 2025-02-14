import { PDF } from "@/types/pdf";
import { Report } from "@/types/report";
import { Summary } from '@/types/summary';

const API_URL = 'http://localhost:8000/api';


async function fetchWithToken(url: string, options: RequestInit, token: string | undefined) {
    const headers = new Headers(options.headers || {});
    if(token){
        headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');
    return fetch(url, { ...options, headers });
}

export async function getReports(token: string): Promise<Report[]> {
    const response = await fetchWithToken(API_URL + "/reports", { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

export async function getSummary(token: string): Promise<Summary> {
    const response = await fetchWithToken(API_URL + "/report/summary", { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

export async function getReportByid(id: number, token: string): Promise<Report> {
    const response = await fetchWithToken(`${API_URL}/reports/${id}`, { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to fetch report with id ${id}`);
    }
    return response.json();
}

export  async function getLinkTemporal(id: number): Promise<PDF> {
    return {
        url: `${API_URL}/generate-pdf/${id}`
    };
}


export async function updateReport(id: number, report: Partial<Report>, token: string): Promise<Report> {
    const response = await fetchWithToken(`${API_URL}/reports/${id}`, {
        method: 'PUT',
        body: JSON.stringify(report),
    }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to update report with id ${id}`);
    }
    return response.json();
}

export async function deleteReport(id: number, token: string): Promise<void> {
    const response = await fetchWithToken(`${API_URL}/reports/${id}`, { method: 'DELETE' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to delete report with id ${id}`);
    }
}
