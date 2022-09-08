// lib/cookie.js

import { serialize } from 'cookie';

const TOKEN_NAME = 'api_token';
const AUTHED = "authed"
const MAX_AGE = 60 * 60 * 8;

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

function deleteCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: 0,
    expires: 0,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

export function setTokenCookie(res, token) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token),
    createCookie(AUTHED, true, { httpOnly: false }),
  ]);
}

export function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

export function destroyCookies(res) {
  res.setHeader('Set-Cookie', [
    deleteCookie(TOKEN_NAME, ""),
    deleteCookie(AUTHED, false, { httpOnly: false }),
  ]);
}


