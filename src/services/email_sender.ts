import { Report } from "@/types/report";

const API_URL = 'https://api-report.ftsmiami.com/api';


async function fetchWithToken(url: string, options: RequestInit, token: string | undefined) {
    const headers = new Headers(options.headers || {});
    if(token){
        headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');
    return fetch(url, { ...options, headers });
}

export async function sendEmailReport( id:string, email:string): Promise<any[]> {
    const token = undefined; // Replace with actual token retrieval logic
    const response = await fetchWithToken(API_URL + "/send-email-report/" + id, { method: 'POST',  body: JSON.stringify({email}),}, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to fetch users');
    }
    return response.json();
}