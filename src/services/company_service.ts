import { Company } from "@/types/company";

const API_URL = 'https://api-report.ftsmiami.com/api';


async function fetchWithToken(url: string, options: RequestInit, token: string) {
    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    return fetch(url, { ...options, headers });
}

export async function getCompanies(token: string): Promise<Company[]> {
    const response = await fetchWithToken(API_URL + "/companies", { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

export async function getCompanyById(id: number, token: string): Promise<Company> {
    const response = await fetchWithToken(`${API_URL}/companies/${id}`, { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    return response.json();
}

export async function createCompany(company: Company, token: string): Promise<Company> {
    const response = await fetchWithToken(`${API_URL}/companies`, {
        method: 'POST',
        body: JSON.stringify({...company, auth: false}),
    }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to create user');
    }
    return response.json();
}

export async function updateCompany(id: number, company: Partial<Company>, token: string): Promise<Company> {
    const response = await fetchWithToken(`${API_URL}/companies/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(company),
    }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to update user with id ${id}`);
    }
    return response.json();
}

export async function deleteCompany(id: number, token: string): Promise<void> {
    const response = await fetchWithToken(`${API_URL}/companies/${id}`, { method: 'DELETE' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to delete user with id ${id}`);
    }
}