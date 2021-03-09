/* eslint-disable prefer-destructuring */
import ROUTES from './routes';
import API_MAP from './url-api';

export const API_URL = process.env.API_URL;
export const TALKJS_USER_URL = process.env.TALKJS_API;;
export const TALKJS_APPID = process.env.TALKJS_APPID;
export const TALKJS_AUTHORIZATION = process.env.TALKJS_AUTHKEY;
export const SITE_KEY = process.env.GOOGLE_SITE_KEY;

export const API_SETTINGS = {
  API_URL,
  TALKJS_USER_URL
};

export const config = {
  ROUTES,
  API_SETTINGS,
  API_MAP,
  API_URL,
  TALKJS_USER_URL,
  TALKJS_APPID,
  TALKJS_AUTHORIZATION,
  SITE_KEY
};

export default function ConfigStorage() {
  return config;
}
