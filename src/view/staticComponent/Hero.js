import { Link } from "react-router-dom";
function hero() {
    return (
        <div className="hero">
            <div className="hero__content">
                <p className="intro-text">Sicurezza first</p>
                <h1 className="big-text">Login warrior</h1>
                <Link to="/upload" className="button plr-1">Prova con il tuo CSV</Link>
            </div>
        </div>
    );
}
export default hero;