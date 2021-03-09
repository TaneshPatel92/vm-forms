import ACTIONS from "../actions-names/index";
import { ActionLoadingUpdate } from "./actions-loading";
import ServerData from "../../api/server-data";
import USERAPI from "../../api/user";
import { openAntdNotification } from "../../services/notifications";

const { SERVER_DATA_ACTIONS } = ACTIONS;

export function ActionServerData(ns, payload) {
  const data = {};
  data[ns] = payload;
  return {
    type: SERVER_DATA_ACTIONS.GET_ALL_PROVIDERS,
    data,
  };
}

export function ActionGetAllProvider(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("providers", true));
    ServerData.getAllProviders(params, header)
      .then((res) => {
        if (res.success) dispatch(ActionServerData("providers", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("providers", false)));
  };
}


export function ActionGetDropDownProviders(params, header) {
  return (dispatch, getState) => {
    dispatch(ActionLoadingUpdate("dropDownProviders", true));
    ServerData.getAllProviders(params, header)
      .then((res) => {
        if (res.success) {
          let providers = []
          if (res.providers.length > 0) {
            res.providers.map(item => {
              providers.push({
                ...item,
                value: item.providerId,
                label: item.fullName
              })
            })
          }
          const { rServerData } = getState()
          let { dropDownProviders } = rServerData
          if (dropDownProviders !== undefined) {
            let mergedArray = _.concat(dropDownProviders.providers, providers)
            mergedArray = _.filter(mergedArray, item => item.value !== "LOADMORE")
            if (res.totalCount >= 50 && res.totalCount > params.pgSkip && mergedArray.length < res.totalCount) {
              mergedArray.push({
                value: "LOADMORE",
                label: "Load More.."
              })
            }
            dispatch(ActionServerData("dropDownProviders", { ...res, providers: mergedArray }));
          } else {
            if (res.totalCount >= 50 && res.totalCount > params.pgSkip) {
              providers.push({
                value: "LOADMORE",
                label: "Load More.."
              })
            }
            dispatch(ActionServerData("dropDownProviders", { ...res, providers }));
          }
        } else dispatch(ActionServerData("dropDownProviders", { ...res, providers: [] }));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("dropDownProviders", false)));
  };
}
