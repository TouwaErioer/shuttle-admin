import {del, get, post} from '@/utils/request'

const API = '/approve/';

export const deleteStore = (params) => del(API + 'deleteStore', params);

export const deleteProduct = (params) => del(API + 'deleteProduct', params);

export const approveStore = (params) => post(API + 'approveStore', params);

export const approveProduct = (params) => post(API + 'approveProduct', params);

export const findAllStore = (pageNo, pageSize) => get(API + 'findAllStore?pageSize=' + pageSize + '&pageNo=' + pageNo);

export const findAllProduct = (pageNo, pageSize) => get(API + 'findAllProduct?pageSize=' + pageSize + '&pageNo=' + pageNo);