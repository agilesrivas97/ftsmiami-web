import { User } from "@/types/user";

const API_URL = 'http://localhost:8000/api';


async function fetchWithToken(url: string, options: RequestInit, token: string) {
    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    return fetch(url, { ...options, headers });
}

export async function getUsers(token: string): Promise<User[]> {
    const response = await fetchWithToken(API_URL + "/users", { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

export async function getUserById(id: number, token: string): Promise<User> {
    const response = await fetchWithToken(`${API_URL}/users/${id}`, { method: 'GET' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    return response.json();
}

export async function createUser(user: User, token: string): Promise<User> {
    const response = await fetchWithToken(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({...user, auth: false}),
    }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to create user');
    }
    return response.json();
}

export async function updateUser(id: number, user: Partial<User>, token: string): Promise<User> {
    const response = await fetchWithToken(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
    }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to update user with id ${id}`);
    }
    return response.json();
}

export async function deleteUser(id: number, token: string): Promise<void> {
    const response = await fetchWithToken(`${API_URL}/users/${id}`, { method: 'DELETE' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error(`Failed to delete user with id ${id}`);
    }
}

export async function loginUser(email: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid credentials');
        }
        throw new Error('Failed to login');
    }
    return response.json();
}

export async function logoutUser(token: string): Promise<void> {
    const response = await fetchWithToken(`${API_URL}/auth/logout`, { method: 'POST' }, token);
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
        }
        throw new Error('Failed to logout');
    }
}