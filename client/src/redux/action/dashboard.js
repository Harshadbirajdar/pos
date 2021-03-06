import {
  GET_PREVIOUS_WEEKLY_CHART_FAILED,
  GET_PREVIOUS_WEEKLY_CHART_START,
  GET_PREVIOUS_WEEKLY_CHART_SUCCESS,
  GET_REPORT_BY_CATEGORY_CHART_FAILED,
  GET_REPORT_BY_CATEGORY_CHART_START,
  GET_REPORT_BY_CATEGORY_CHART_SUCCESS,
  GET_WEEKLY_CHART_FAILED,
  GET_WEEKLY_CHART_START,
  GET_WEEKLY_CHART_SUCCESS,
} from "./action.type";
import axios from "axios";
import { isAuthenticated } from "../../apicall";
import { API } from "../../backend";
import moment from "moment";
const getWeeklyChartStart = () => ({
  type: GET_WEEKLY_CHART_START,
});

const getWeeklyChartSuccess = (data) => ({
  type: GET_WEEKLY_CHART_SUCCESS,
  payload: data,
});

const getWeeklyChartFailed = (error) => ({
  type: GET_WEEKLY_CHART_FAILED,
  payload: error,
});

export const getWeeklyChart = () => {
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getWeeklyChartStart());

    axios
      .get(`${API}/${user._id}/bill/chart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getWeeklyChartSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getWeeklyChartFailed(err.response.data.error));
      });
  };
};

const getPreviousWeeklyChartStart = () => ({
  type: GET_PREVIOUS_WEEKLY_CHART_START,
});

const getPreviousWeeklyChartSuccess = (data) => ({
  type: GET_PREVIOUS_WEEKLY_CHART_SUCCESS,
  payload: data,
});

const getPreviousWeeklyChartFailed = (error) => ({
  type: GET_PREVIOUS_WEEKLY_CHART_FAILED,
  payload: error,
});

export const getPreviousWeeklyChart = () => {
  let currentDate = new Date();

  let date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay() - 7
  );
  const { user, token } = isAuthenticated();
  return (dispatch) => {
    dispatch(getPreviousWeeklyChartStart());

    axios
      .get(`${API}/${user._id}/bill/chart?date=${date}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getPreviousWeeklyChartSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getPreviousWeeklyChartFailed(err.response.data.error));
      });
  };
};

const getReportByCategoryChartStart = () => ({
  type: GET_REPORT_BY_CATEGORY_CHART_START,
});
const getReportByCategoryChartSuccess = (data) => ({
  type: GET_REPORT_BY_CATEGORY_CHART_SUCCESS,
  payload: data,
});
const getReportByCategoryChartFailed = (err) => ({
  type: GET_REPORT_BY_CATEGORY_CHART_FAILED,
  payload: err,
});

export const getReportByCategoryChart = () => {
  const { user, token } = isAuthenticated();
  const date = moment(new Date()).format("YYYY-MM-DD");
  return (dispatch) => {
    dispatch(getReportByCategoryChartStart());
    axios
      .get(
        `${API}/${user._id}/category/chart?startDate=${date}&endDate=${date}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getReportByCategoryChartSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getReportByCategoryChartFailed(err.response.data.error));
      });
  };
};
