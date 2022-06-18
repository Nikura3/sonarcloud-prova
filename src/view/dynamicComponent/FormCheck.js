import CheckBox from "./CheckBox";
function formCheck(props) {
    function createCheckBox() {
        let element = [];
        for (let i = 0; i < props.list.length; i++) {
            if (props.isNumeric[i]) {
                element.push(<CheckBox value={props.list[i]} key={`key${i}`} id={i} />);
            }
        }
        return element;
    }
    return (
        <div className="box">
            <div className="form">
                <div className="title">Scegli le dimensioni desiderate</div>
                <div className="contenuto">
                    <form id="myForm">
                        {createCheckBox()}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default formCheck;