import http, { AjaxResponse } from '@/utils/http';

const taskList = (params: object): Promise<AjaxResponse> => http.get('tasks', { params });
const createTask = (params: object): Promise<AjaxResponse> => http.post('tasks', params);
const taskDetail = (id: number): Promise<AjaxResponse> => http.get(`tasks/${id}`);
const updateTask = (id: number, params: object): Promise<AjaxResponse> => http.put(`tasks/${id}`, params);
const delTask = (id: number): Promise<AjaxResponse> => http.delete(`tasks/${id}`);

export default {
    taskList,
    createTask,
    taskDetail,
    updateTask,
    delTask
};