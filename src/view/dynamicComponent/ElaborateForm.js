import CircleChart from "./CircelChart";
import FormCheck from "./FormCheck";
function elaborateForm(props) {
    return (
        <div className="newForm">
            <FormCheck list={props.list} isNumeric={props.isNumeric} />
            <div className="circle">
                <CircleChart name="scatter plot" img="scattern" />
                <CircleChart name="sankey diagram" img="sankey" />
                <CircleChart name="parallel coordinates" img="parallel" />
                <CircleChart name="force Directed" img="forceDirect" />
            </div>
        </div>
    );
}
export default elaborateForm;