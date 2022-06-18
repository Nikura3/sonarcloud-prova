import React from "react";
import Form from "./dynamicComponent/Form";
import Header from "./staticComponent/Header";
import HeroForm from "./staticComponent/HeroForm";
import Footer from "./staticComponent/Footer";
import ElaborateForm from "./dynamicComponent/ElaborateForm";
import { useSelector } from "react-redux";
import Chart from "./chartComponent/ChartComponent";

function Upload() {
  const list = useSelector((state) => state.dim.dimension);
  const isNumeric = useSelector((state) => state.dim.isNumeric);
  const isChart = useSelector((state) => state.chart.isChart);
  const isForm = useSelector((state) => state.form.isForm);

  return (
    <div>
      <Header />
      <HeroForm />
      {isForm && !isChart && <Form />}
      {!isForm && !isChart && (
        <ElaborateForm list={list} isNumeric={isNumeric} />
      )}
      <Chart />
      <Footer />
    </div>
  );
}
export default Upload;
