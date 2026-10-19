/**
 * API Service Layer
 * The React app is served by the Spring Boot backend, so the API lives on the
 * same origin at /api. During `npm run dev` the dev server forwards /api to
 * http://localhost:8080 (see server.proxy in vite.config.js).
 * To point at a different backend, set VITE_API_URL at build time.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

// Attach a friendly error message for every failure
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            error.friendlyMessage =
                'Cannot reach the server. The backend may be starting up or offline.';
        } else if (error.response.status === 403) {
            error.friendlyMessage = 'Access denied by the server.';
        } else if (error.response.status >= 500) {
            error.friendlyMessage = 'The server encountered an error.';
        }
        return Promise.reject(error);
    }
);

/* ---------------- Students ---------------- */
export const studentAPI = {
    getAll: () => api.get('/students'),
    // getById: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    update: (id, data) => api.put(`/students/${id}`, data),
    delete: (id) => api.delete(`/students/${id}`),
};

/* ---------------- Courses ---------------- */
export const courseAPI = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

/* ---------------- Enrollments ---------------- */
export const enrollmentAPI = {
    getAll: () => api.get('/enrollments'),
    enroll: (data) => api.post('/enrollments', data),
    getByStudent: (studentId) => api.get(`/enrollments/student/${studentId}`),
    getByCourse: (courseId) => api.get(`/enrollments/course/${courseId}`),
    getById: (id) => api.get(`/enrollments/${id}`),
    delete: (id) => api.delete(`/enrollments/${id}`),
};

/* ---------------- Attendance ---------------- */
export const attendanceAPI = {
    mark: (enrollmentId, status) =>
        api.post(`/attendance/mark/${enrollmentId}?status=${status}`),
    getByStudent: (studentId) => api.get(`/attendance/student/${studentId}`),
    getPercentage: (studentId) => api.get(`/attendance/percentage/${studentId}`),
};

/* ---------------- Fees ---------------- */
export const feeAPI = {
    create: (data) => api.post('/fees', data),
    pay: (feeId, amount) => api.put(`/fees/pay/${feeId}?amount=${amount}`),
    getByStudent: (studentId) => api.get(`/fees/student/${studentId}`),
    getUnpaid: () => api.get('/fees/unpaid'),
    getPartial: () => api.get('/fees/partial'),
    checkStatus: (studentId) => api.get(`/fees/check/${studentId}`),
    getAll: () => api.get('/fees'),
    delete: (id) => api.delete(`/fees/${id}`),
};

export default api;