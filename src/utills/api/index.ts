// 统一发送ajax请求的接口
import ajax from './ajax';
import * as types from './types';

const prev = process.env.NODE_ENV === 'development' ? '/api' : '';

// 登陆鉴权
export const login = (data: types.login, method: string) => ajax(`${prev}/account/login/wapi/ajax`, data, method);
