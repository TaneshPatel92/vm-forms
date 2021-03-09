import ACTIONS from '../actions-names/index'
import { ActionLoadingUpdate } from './actions-loading'
import UtilsData from '../../api/utils-data'
import _ from 'lodash'
import { openAntdNotification } from '../../services/notifications'
import { UtilsHelper } from '../../utils/utils-helper'

const { UTILS_ACTIONS } = ACTIONS

export function ActionUtilsData(ns, payload) {
  const data = {}
  data[ns] = payload
  return {
    type: UTILS_ACTIONS.UPDATEDATA,
    data
  }
}

export function ActionGetAllJobsForAdmin(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('allJobAdmin', true))
    UtilsData.getAllJobordersForAdmin(params, header)
      .then(res => {
        if (res.success) {
          if (res.jobs !== undefined)
            dispatch(ActionUtilsData('allJobAdmin', res))
          else {
            dispatch(ActionUtilsData('allJobAdmin', { ...res, totalCount: 0, jobs: [] }))
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('allJobAdmin', false)))
  }
}

export function ActionGetAllJobsToExport(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('allJobToExport', true))
    UtilsData.getAllJobordersForAdmin(params, header)
      .then(res => {
        if (res.success) {
          if (res.jobs !== undefined)
            dispatch(ActionUtilsData('allJobToExport', res))
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('allJobToExport', false)))
  }
}
