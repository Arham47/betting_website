import { LOWER_TOKEN } from "@utils/const"

const AUTH_TOKEN = 'adminToken'
export function getTokenFromCookies() {
  return localStorage.getItem(AUTH_TOKEN) || ''
}

export function setTokenIntoCookies(token: string) {
  localStorage.setItem(AUTH_TOKEN, 'adminToken')
}
export function flushTokenFromCookies() {
  localStorage.removeItem(AUTH_TOKEN)
}
export function getAuthorizationHeader() {
  return `Bearer ${getTokenFromCookies()}`
}
