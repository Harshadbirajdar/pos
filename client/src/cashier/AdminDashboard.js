import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Base from "../core/Base";
import { Bar, Pie } from "react-chartjs-2";
import {
  getWeeklyChart,
  getPreviousWeeklyChart,
  getReportByCategoryChart,
} from "../redux/action/dashboard";
const AdminDashboard = ({
  fetchChartData,
  chart,
  fetchPreviousWeek,
  previousChart,
  CategoryChart,
  fetchCategoryData,
}) => {
  useEffect(() => {
    fetchChartData();
    fetchPreviousWeek();
    fetchCategoryData();
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

  const pieCharData = {
    labels: Object.keys(CategoryChart.data),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(CategoryChart.data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Base title="Dashboard">
      <Grid container>
        <Grid item md={6}>
          <Bar data={data} options={options} />
        </Grid>
        <Grid item style={{ margin: "auto" }} md={3}>
          <Pie
            data={pieCharData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </Grid>
      </Grid>
    </Base>
  );
};
const mapStateToProps = (state) => ({
  chart: state.dashboard.chart,
  previousChart: state.dashboard.previousChart,
  CategoryChart: state.dashboard.category,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChartData: () => {
    dispatch(getWeeklyChart());
  },
  fetchPreviousWeek: () => {
    dispatch(getPreviousWeeklyChart());
  },
  fetchCategoryData: () => {
    dispatch(getReportByCategoryChart());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
