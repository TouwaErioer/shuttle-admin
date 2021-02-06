import {del, post, get} from "@/utils/request";

const API = '/order/';

export const insertOrder = (params) => post(API + 'insert', params);

export const deleteOrder = (params) => del(API + 'delete', params);

export const updateOrder = (params) => post(API + 'update', params);

export const findAllOrder = (params) => get(API + 'findAll?' + 'pageNo=' + params.pageNo);