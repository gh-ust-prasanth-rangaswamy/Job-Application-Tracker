import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

export const getApplications = () => axios.get(API_URL);
export const addApplication = (app) => axios.post(API_URL, app);
export const updateApplication = (id, app) => axios.put(`${API_URL}/${id}`, app);
export const deleteApplication = (id) => axios.delete(`${API_URL}/${id}`);

export const getPaginatedApplications = (page, size, search, status) =>
    axios.get(`${API_URL}/page`, {
        params: {
            page,
            size,
            search,
            status
        }
    });
export const getStatistics = () =>
    axios.get(`${API_URL}/stats`);

