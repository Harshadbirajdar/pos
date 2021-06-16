import { isAuthenticated } from "../../apicall";
import axios from "axios";
import { API } from "../../backend";
const {
  GET_BILL_REPORT_STRAT,
  GET_BILL_REPORT_SUCCESS,
  GET_BILL_REPORT_FAILED,
} = require("./action.type");

const getBillReportStrat = () => ({
  type: GET_BILL_REPORT_STRAT,
});

const getBillReportSuccess = (bill) => ({
  type: GET_BILL_REPORT_SUCCESS,
  payload: bill,
});

const getBillReportFailed = (error) => ({
  type: GET_BILL_REPORT_FAILED,
  payload: error,
});

export const getBillReport = (rowPerPage, page, startDate, endDate, sort) => {
  const { user, token } = isAuthenticated();
  return (dispacth) => {
    dispacth(getBillReportStrat());
    axios
      .get(
        `${API}/${user._id}/report/bill?startDate=${startDate}&endDate=${endDate}&sort=${sort}&rowPerPage=${rowPerPage}&page=${page}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const { bill, totalCount } = response.data;
        console.log(response.data);
        dispacth(getBillReportSuccess({ bill, totalCount, rowPerPage, page }));
      })
      .catch((err) => {
        dispacth(getBillReportFailed(err.response.data.error));
      });
  };
};
