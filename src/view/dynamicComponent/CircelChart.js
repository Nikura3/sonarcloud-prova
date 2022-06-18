import chartVM from "../../viewModel/ChartVM";

function CircleChart(props) {
  const chartVm = new chartVM(props.name);
  function trigger() {
    chartVm.makeChart();
  }
  return (
    <div className={`circle${props.img}`} onClick={trigger}>
      <p>{props.name}</p>
    </div>
  );
}
export default CircleChart;
