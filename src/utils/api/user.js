import {get, post, del} from '@/utils/request'

const api = '/user/';

// 登录
export const login = (params) => post(api + 'login', params);

// 注册
export const register = (params) => post(api + 'register', params);

// 检查
export const check = () => get(api + 'check');

// 删除用户
export const deleteUser = (params) => del(api + 'delete', params);

// 更新用户资料
export const update = (params) => post(api + 'update', params);

// 查询全部用户
export const findAll = (params) => get(api + 'findAll?' + 'pageNo=' + params.pageNo);

// 搜索
export const search = (params) => post(api + 'search', params);

// 设置管理员
export const admin = (params) => post(api + 'admin', params);