import {del, post, get} from "@/utils/request";

const API = '/product/';

export const insertProduct = (params) => post(API + 'insert', params);

export const deleteProduct = (params) => del(API + 'delete', params);

export const updateProduct = (params) => post(API + 'update', params);

export const findAllProduct = (params) => get(API + 'findAll?' + 'pageNo=' + params.pageNo);