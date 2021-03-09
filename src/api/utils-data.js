import http from "../services/http"
import $q from "q";
import { config } from "../configs";

const { API_MAP, API_URL } = config;

const headerConfig = {
    'Access-Control-Allow-Origin': "*, *",
    'Content-Type': 'application/json',
}

export default class UtilsData {


    static getAllJobordersForAdmin(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag, jobStatusId, countryId } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '';
        jobStatusId != undefined ? url += '&jobStatusId=' + jobStatusId : '';
        countryId != undefined ? url += '&countryId=' + countryId : '';

        http.get(API_URL + API_MAP.ALLJOBSFORADMIN + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }
}