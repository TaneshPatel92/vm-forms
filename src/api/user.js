import http from "../services/http";
import $q from "q";
import _ from 'lodash'
import { config } from "../configs";

const { API_MAP, API_URL } = config;

const headerConfig = {
  "Access-Control-Allow-Origin": "*, *",
  "Content-Type": "application/json"
};

export default class USERAPI {

  static login(params) {
    const deferred = $q.defer();
    http
      .post(API_URL + API_MAP.LOGIN, params, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));
    return deferred.promise;
  }
  // API to get OTP
  static authenticateUser(params) {
    const deferred = $q.defer();
    http
      .post(API_URL + API_MAP.AUTHENTICATE, params, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }
}
