import {
  GET_PREVIOUS_WEEKLY_CHART_FAILED,
  GET_PREVIOUS_WEEKLY_CHART_START,
  GET_PREVIOUS_WEEKLY_CHART_SUCCESS,
  GET_WEEKLY_CHART_FAILED,
  GET_WEEKLY_CHART_START,
  GET_WEEKLY_CHART_SUCCESS,
  GET_REPORT_BY_CATEGORY_CHART_FAILED,
  GET_REPORT_BY_CATEGORY_CHART_SUCCESS,
  GET_REPORT_BY_CATEGORY_CHART_START,
} from "../action/action.type";

const initalState = {
  chart: {
    loading: false,
    data: [],
    error: false,
  },
  previousChart: {
    loading: false,
    data: [],
    error: false,
  },
  category: {
    loading: false,
    data: {},
    error: false,
  },
};

const dashboard = (state = initalState, action) => {
  switch (action.type) {
    case GET_WEEKLY_CHART_START:
      return { ...state, chart: { loading: true, data: [], error: false } };

    case GET_WEEKLY_CHART_SUCCESS:
      return {
        ...state,
        chart: { loading: false, data: action.payload, error: false },
      };

    case GET_WEEKLY_CHART_FAILED:
      return {
        ...state,
        chart: { loading: false, data: [], error: action.payload },
      };

    case GET_PREVIOUS_WEEKLY_CHART_START:
      return {
        ...state,
        previousChart: { loading: true, data: [], error: false },
      };

    case GET_PREVIOUS_WEEKLY_CHART_SUCCESS:
      return {
        ...state,
        previousChart: { loading: false, data: action.payload, error: false },
      };

    case GET_PREVIOUS_WEEKLY_CHART_FAILED:
      return {
        ...state,
        previousChart: { loading: false, data: [], error: action.payload },
      };

    case GET_REPORT_BY_CATEGORY_CHART_START:
      return {
        ...state,
        category: {
          loading: true,
          data: {},
          error: false,
        },
      };

    case GET_REPORT_BY_CATEGORY_CHART_SUCCESS:
      return {
        ...state,
        category: {
          loading: false,
          data: action.payload,
          error: false,
        },
      };
    case GET_REPORT_BY_CATEGORY_CHART_FAILED:
      return {
        ...state,
        category: {
          loading: false,
          data: {},
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default dashboard;
