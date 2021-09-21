import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Base from "../core/Base";
import { Bar } from "react-chartjs-2";
import {
  getWeeklyChart,
  getPreviousWeeklyChart,
} from "../redux/action/dashboard";
const AdminDashboard = ({
  fetchChartData,
  chart,
  fetchPreviousWeek,
  previousChart,
}) => {
  useEffect(() => {
    fetchChartData();
    fetchPreviousWeek();
  }, []);
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        type: "bar",
        label: "Previous Week Income",
        data: Object.values(previousChart.data),
        backgroundColor: "rgb(140, 41, 193)",
        borderColor: "rgb(140, 41, 193,0.2)",
      },
      {
        type: "bar",
        label: "Current Week Income",
        data: Object.values(chart.data),
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Base title="Dashboard">
      <Grid container>
        <Grid item md={6}>
          <Bar data={data} options={options} />
        </Grid>
      </Grid>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  chart: state.dashboard.chart,
  previousChart: state.dashboard.previousChart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChartData: () => {
    dispatch(getWeeklyChart());
  },
  fetchPreviousWeek: () => {
    dispatch(getPreviousWeeklyChart());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
