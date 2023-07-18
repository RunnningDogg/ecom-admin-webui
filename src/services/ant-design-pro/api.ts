// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {API} from "@/services/ant-design-pro/typings";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/current', {
    // currentUser
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    // /api/login/outLogin
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    // /api/login/account
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 表格api 2023年07月04日
export async function queryDetailedDirectLogistic(
  body?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.DirectQueryResult>('/api/logistic/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function queryDetailedDirectLength(body: {[key: string]: any}){
  return request('/api/logistic/count/table',{
    method: 'POST',
    data: body
  })
}

// 根据条件获取summary表格的长度
export async function querySummaryLength(body: API.TableParams){
  return request('/api/logistic/count/summary', {
    method: 'POST',
    data: body
  })
}


