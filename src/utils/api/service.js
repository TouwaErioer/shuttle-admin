import {del, get, post} from '@/utils/request'

const API = '/service/';

export const insertService = (params) => post(API + 'insert', params);

export const deleteService = (params) => del(API + 'delete', params);

export const updateService = (params) => post(API + 'update', params);

export const findAllService = (params) => get(API + 'findAll?' + 'pageNo=' + params.pageNo);

