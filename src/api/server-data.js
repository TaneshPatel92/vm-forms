import http from "../services/http"
import $q from "q";
import { config } from "../configs";

const { API_MAP, API_URL } = config;
const headerConfig = {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json',
}


export default class ServerData {

    static getAllProviders(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag, cityId, stateId, qualificationId, serviceId, providerType, favorite, name } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '';
        cityId != undefined ? url += '&cityId=' + cityId : '';
        stateId != undefined ? url += '&stateId=' + stateId : '';
        qualificationId != undefined ? url += '&qualificationId=' + qualificationId : '';
        serviceId != undefined ? url += '&serviceId=' + serviceId : '';
        providerType != undefined ? url += '&providerType=' + providerType : '';
        favorite != undefined ? url += '&favorite=' + favorite : '';
        name != undefined ? url += '&name=' + name : '';

        http.get(API_URL + API_MAP.GETALLPROVIDERS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }
}

