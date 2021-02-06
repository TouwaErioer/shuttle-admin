import {del, post,get} from "@/utils/request";

const API = '/category/';

export const insertCategory = (params) => post(API + 'insert', params);

export const deleteCategory = (params) => del(API + 'delete', params);

export const updateCategory = (params) => post(API + 'update', params);

export const findAllCategory = () => get(API + 'findAll');