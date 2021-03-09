import ACTIONS from "../actions-names/index";
import USERAPI from "../../api/user";
import { ActionLoadingUpdate } from "./actions-loading";
import { ActionRouteNavigate } from "./actions-route";
import { ActionSessionStart } from "./actions-session";
import ROUTES from "../../configs/routes";

const { USER_ACTIONS } = ACTIONS;

export function ActionUserUpdate(key, data) {
  return {
    type: USER_ACTIONS.UPDATE,
    key,
    data,
  };
}

export function ActionUserClear() {
  return {
    type: USER_ACTIONS.CLEAR,
  };
}

export function ActionLogin(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("login", true));
    USERAPI.login(params)
      .then((res) => {
        let userDetails = {};
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Sign In Failed",
            message: res.message,
          });
        }
        if (res.success) {
          userDetails = {
            ...res,
            LOGGED_IN: true,
            email: res.email,
            mobileNumber: params.mobileNumber,
            countryId: res.countryId,
            countryName: res.countryName,
            countryShortCode: res.countryShortCode,
            currency: res.currency
          };
          if (userDetails.role === "Member") {
          }
          if (userDetails.role === "Provider") {
          }
          if (userDetails.role === "Organization") {
          }
          if (userDetails.role === "Admin") {
          }
          // dispatch(ActionGetCountry())
          dispatch(ActionSessionStart("authenticated", true, userDetails));
          dispatch(ActionRouteNavigate(ROUTES.HOME));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("login", false)));
  };
}

export function ActionAuthenticate(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("authenticate", true));
    USERAPI.authenticateUser(params)
      .then((res) => {
        if (!res.success) {
        }
        if (res.success) {
        }
        dispatch(ActionUserUpdate("authenticationResponce", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("authenticate", false)));
  };
}

