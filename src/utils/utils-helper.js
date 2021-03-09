/* eslint-disable no-undef */
/* globals: window */

import moment from "moment";
import _ from "lodash";
import { getState } from '../store/store'

export class UtilsHelper {
  static serialize(obj, prefix = false) {
    const str = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const p in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];
        str.push(
          v !== null && typeof v === "object"
            ? UtilsHelper.serialize(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
      }
    }
    return str.join("&");
  }

  static clearPhoneNumber(number) {
    return number.replace(/\D/gi, "");
  }

  static randomStr(length = 7) {
    let i = 0;
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (i; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  static random = (length) => Math.round(Math.random() * 10 ** length);

  static getWeekRangeByDate(date) {
    const weekNumber = moment(date).isoWeek();
    const yearNumber = moment(date).format("YYYY");

    return UtilsHelper.getWeekRangeByWeekAndYear(weekNumber, yearNumber);
  }

  static getWeekRangeByWeekAndYear(weekNumber, yearNumber) {
    const startDate = moment()
      .year(yearNumber)
      .isoWeek(weekNumber)
      .startOf("isoweek");
    const endDate = moment()
      .year(yearNumber)
      .isoWeek(weekNumber)
      .endOf("isoweek");

    return {
      startDate,
      endDate,
    };
  }

  static numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  static trimSlashes = (url) => url && url.replace(/^\/|\/$/g, "");

  static normalizeDividedNumber = (number) => {
    return number - Math.round(number) < 0.015 ? Math.round(number) : number;
  };

  static round = (number, roundTo = 100) =>
    Math.round(number * roundTo) / roundTo;

  static isNumeric = (value) => !Number.isNaN(value - parseFloat(value));

  static reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  static getNum = (val) => {
    if (Number.isNaN(val) || val === undefined) {
      return 0;
    }
    return parseFloat(val);
  };

  static scrollToTop(scrollDuration = 0) {
    const scrollHeight = window.scrollY;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;
    let scrollCount = 0;
    let scrollMargin;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        scrollCount += 1;
        scrollMargin =
          cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  static removeEmptyFields = (object) => {
    return (
      Object.entries(object)
        // eslint-disable-next-line no-unused-vars
        .filter(([key, value]) => {
          if (_.isArray(value)) {
            return !_.isEmpty(value);
          }

          return !!value || value === 0;
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value;

          return acc;
        }, {})
    );
  };

  static normalizeImageUrl = (url, options = { size: "sm" }) => {
    if (!url) return "./images/required/placeholder-product.jpg";
    let size = "&w=320";

    switch (options.size) {
      case "sm":
        size = "&w=320";
        break;
      case "xs":
        size = "&h=50";
        break;
      default:
        size = "&w=320";
    }

    return _.first(url.split("&")) + size;
  };

  static milesToKilometers = (miles) => {
    return parseInt(miles) * 1.60934;
  };

  static getAssetsAndColor = (jobStatusId) => {
    let data = {
      cls: "",
      image: "",
      JobStatus: "",
      providerMessage: "",
      memberMessage: "",
      AcknowledgeMessage: "",
      JobStatusAdminPanel: "",
      PaymentStatusAdminPanel: "",
      providerPaymentStatus: "",
      memberPaymentStatus: ""
    };

    if (jobStatusId === 1) {
      data = {
        image: "waiting.png",
        cls: "approval",
        providerMessage: "New Job Order",
        memberMessage: "Waiting for Acceptance",
        AcknowledgeMessage: "New created Job",
        JobStatusAdminPanel: "New Job Created by Member",
        PaymentStatusAdminPanel: "NA",
        providerPaymentStatus: "NA",
        memberPaymentStatus: "NA"
      };
    } else if (jobStatusId === 2) {
      data = {
        image: "invoice.png",
        cls: "payment-success",
        providerMessage: "Start the Job",
        memberMessage: "Waiting for Provider to start the Job",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Payment done by Member",
        PaymentStatusAdminPanel: "Done by Member",
        providerPaymentStatus: "Done By Member",
        memberPaymentStatus: "Completed"
      };
    } else if (jobStatusId === 3) {
      data = {
        image: "reject.png",
        cls: "rejected",
        providerMessage: "You rejected the job",
        memberMessage: "Provider rejected the job",
        AcknowledgeMessage: "Rejected",
        JobStatusAdminPanel: "Job Rejected by Provider",
        PaymentStatusAdminPanel: "NA",
        providerPaymentStatus: "NA",
        memberPaymentStatus: "NA"
      };
    } else if (jobStatusId === 4) {
      data = {
        image: "attention.png",
        cls: "attention",
        providerMessage: "Waiting for the payment",
        memberMessage: "Make the payment",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Job Accepted by Provider",
        PaymentStatusAdminPanel: "Not Paid By The Member",
        providerPaymentStatus: "NA",
        memberPaymentStatus: "NA"
      };
    } else if (jobStatusId === 5) {
      data = {
        image: "canceled-Job.png",
        cls: "rejected",
        providerMessage: "Job Cancelled by Member",
        memberMessage: "Job Cancelled by Member",
        AcknowledgeMessage: "Cancelled Job",
        JobStatusAdminPanel: "Cancelled Job",
        PaymentStatusAdminPanel: "Member is requesting for Refund",
        providerPaymentStatus: "Cancelled Job",
        memberPaymentStatus: ""
      };
    } else if (jobStatusId === 6) {
      data = {
        image: "on_process.png",
        cls: "progress",
        providerMessage: "On Going Job ",
        memberMessage: "Work on progress ",
        AcknowledgeMessage: "On Progress",
        JobStatusAdminPanel: "Job started by Provider",
        PaymentStatusAdminPanel: "Received by Admin",
        providerPaymentStatus: "Done By Member",
        memberPaymentStatus: "Completed"
      };
    } else if (jobStatusId === 7) {
      data = {
        image: "attention.png",
        cls: "attention",
        providerMessage: "Waiting for Acknowledgement ",
        memberMessage: "Acknowledge the Job",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Job completed by Provider",
        PaymentStatusAdminPanel: "Received by Admin",
        providerPaymentStatus: "Done By Member",
        memberPaymentStatus: "Completed"
      };
    } else if (jobStatusId === 8) {
      data = {
        image: "successfully_done.png",
        cls: "success",
        providerMessage: "Successfully Done!",
        memberMessage: "Successfully Done!",
        AcknowledgeMessage: "Provider's Payout is Due",
        JobStatusAdminPanel: "Job Approved by Member",
        PaymentStatusAdminPanel: "Received by Admin",
        providerPaymentStatus: "Done By Member",
        memberPaymentStatus: "Completed"
      };
    } else if (jobStatusId === 9) {
      data = {
        image: "reject.png",
        cls: "rejected",
        providerMessage: "Job Rejected by Member",
        memberMessage: "Job Rejected by Member",
        AcknowledgeMessage: "Rejected",
        JobStatusAdminPanel: "Job Rejected by Member",
        PaymentStatusAdminPanel: "Member is requesting for refund",
        providerPaymentStatus: "On Hold",
        memberPaymentStatus: "On Hold"
      };
    } else if (jobStatusId === 10) {
      data = {
        image: "successfully_done.png",
        cls: "success",
        providerMessage: "Successfully Done!",
        memberMessage: "Successfully Done!",
        AcknowledgeMessage: "Job Done!",
        JobStatusAdminPanel: "Payment received by Provider",
        PaymentStatusAdminPanel: "Received by Provider",
        providerPaymentStatus: "Job has been Successfully Done!",
        memberPaymentStatus: "Completed"
      };
    }
    else if (jobStatusId === 11) {
      data = {
        image: "auto-rejected.png",
        cls: "rejected",
        providerMessage: "Auto Rejected",
        memberMessage: "Auto Rejected",
        AcknowledgeMessage: "Auto Rejected",
        JobStatusAdminPanel: "Job has been auto Rejected",
        PaymentStatusAdminPanel: "NA",
        providerPaymentStatus: "Job has been auto Rejected",
        memberPaymentStatus: "NA"
      };
    }
    else if (jobStatusId === 12) {
      data = {
        image: "refundToMember.png",
        cls: "success",
        providerMessage: "",
        memberMessage: "",
        AcknowledgeMessage: "Refunded to Member",
        JobStatusAdminPanel: "Refund to Member for cancelled/reassigned jobs",
        PaymentStatusAdminPanel: "Refunded to Member",
        providerPaymentStatus: "Refunded to Member",
        memberPaymentStatus: "NA"
      };
    }
    return data;
  };

  static getMonthsDropdown() {
    let monthArray = [];
    for (let index = 1; index <= moment.months().length; index++) {
      monthArray.push({ value: index, label: moment.monthsShort()[index - 1] });
    }
    return monthArray;
  }

  static getCustomNumberInDropDown(start, end) {
    let dateArray = [];
    for (let index = start; index <= end; index++) {
      dateArray.push({ value: index, label: index });
    }
    return dateArray;
  }

  static getYearDropdown(startYear, endYear) {
    let yearArray = [];
    for (let index = startYear; index <= endYear; index++) {
      yearArray.push({ value: index, label: index });
    }
    return yearArray;
  }

  static readUrlByKey(key) {
    // example
    const search = location.href.split("?");
    const querySplit = search[1] ? search[1].split("&") : [];

    const data = [];
    for (var i = 0; i < querySplit.length; i++) {
      data[querySplit[i].split("=")[0]] = querySplit[i].split("=")[1]
    }
    return data[key]
  }

  static getJobStatusIds() {
    return [
      { value: 0, label: "View All" },
      { value: 1, label: "New Job Orders" },
      { value: 3, label: "Rejected by Providers" },
      { value: 4, label: "Accepted by Providers" },
      { value: 2, label: "Member has done the Payment" },
      { value: 6, label: "Jobs In Progress" },
      { value: 7, label: "Job Completed by Provider" },
      { value: 8, label: "Accepted by Member" },
      { value: 9, label: "Rejected by Members" },
      { value: 11, label: "Auto Rejected" },
      { value: 5, label: "Member has Cancelled Job" },
      { value: 12, label: "Member Refund Completed" },
      { value: 10, label: "Closed Jobs" },
      // { value: 5, label: "Deleted" },
    ]
  }

  static GenerateFormattedIds(id, type) {
    if (type === 'job')
      return id <= 9 ? 'J00' + id : id <= 99 ? 'J0' + id : 'J' + id
    if (type === 'pro')
      return id <= 9 ? 'P00' + id : id <= 99 ? 'P0' + id : 'P' + id
    if (type === 'mem')
      return id <= 9 ? 'M00' + id : id <= 99 ? 'M0' + id : 'M' + id
    else return id
  }

  static attachCurrencySymbol(amt, fraction = 2) {
    const rdxStore = getState();
    const { rSession } = rdxStore;
    const { currency, countryShortCode } = rSession
    const currencyCodes = {
      IN: {
        currency: 'INR',
        locale: 'en',
      },
      AE: {
        currency: 'AED',
        locale: 'ar',
      },
      USA: {
        currency: 'USD',
        locale: 'en',
      }
    }
    let finalString = 0
    try {
      finalString = Number(amt).toLocaleString(currencyCodes[countryShortCode] ?
        currencyCodes[countryShortCode].locale : currencyCodes.IN.locale,
        {
          maximumFractionDigits: fraction,
          style: 'currency',
          currency: currencyCodes[countryShortCode]?.currency,
        })
      if (countryShortCode === "AE" && (amt === 0 || amt === null))
        return finalString.replace("٠٫٠٠", "").replace('0.00', "")
      if (amt === 0 || amt === null)
        return finalString.replace("0.00", "")
      return finalString
    } catch (e) {
      return amt
    }
  }

  static httpGetAsyncClientLocation(country, callback) {
    const rdxStore = getState();
    const { rUtils } = rdxStore;
    const { ipLookupCountry } = rUtils
    if (ipLookupCountry) {
      // it means duplicate call
      if (ipLookupCountry !== undefined) {
        const defaultCountry = _.filter(country?.data, obj => obj.countryCode == ipLookupCountry.countryCode)
        callback("ALREADY_AVAILABLE", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
      }
    }
    else {
      // freshCall for ipLookup
      const url = process.env.IP_INFO_API
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          // api success
          let res = xmlHttp.responseText;
          try {
            const obj = JSON.parse(res);
            const searchFromCountry = _.filter(country?.data, item => item.countryCode == obj.country)
            if (searchFromCountry.length == 1) {
              // if serving country
              callback("SUCCESS_NEW", searchFromCountry[0]);
            }
            else {
              // for other country default taken india
              const defaultCountry = _.filter(country?.data, obj => obj.countryCode == "IN")
              callback("SUCCESS", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
            }
          }
          catch (err) {
            // if error occurs
            console.log('err', err);
            const defaultCountry = _.filter(country?.data, obj => obj.countryCode == "IN")
            callback("ERROR", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
          }
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 429) {
          // exceeded call default india
          const defaultCountry = _.filter(country?.data, obj => obj.countryCode == "IN")
          callback("LIMIT_EXCEEDED", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 403) {
          // exceeded call default india
          const defaultCountry = _.filter(country?.data, obj => obj.countryCode == "IN")
          callback("ERROR", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
        }
      }
      xmlHttp.addEventListener('error', () => {
        // if error occurs 
        const defaultCountry = _.filter(country?.data, obj => obj.countryCode == "IN")
        callback("ERROR", defaultCountry.length == 1 ? defaultCountry[0] : undefined)
      });
      xmlHttp.open("GET", url, true); // true for asynchronous
      xmlHttp.send(null);
    }
  }

  static scheduleNotificationHandler = (difference = 1, type = "minutes", callback) => {
    /*
     difference : number 
     type:   'minutes' | 'hours'  | 'days' | 'months' | 'years'  , default "days"
     callback:  callback function
    */
    const rdxStore = getState();
    const { rUtils } = rdxStore;
    const { bankDetailNotifyTimeStamp } = rUtils
    let currentTime = moment()
    const conditionChange = currentTime.diff(moment(bankDetailNotifyTimeStamp), type)
    if (bankDetailNotifyTimeStamp !== undefined) {
      if (conditionChange >= difference)
        callback("FIRST_TIME_EXECUTION")
      else
        console.log(`difference is less than ${difference} ${type}`);
    }
    else
      callback("FIRST_TIME_EXECUTION")
  }
}
