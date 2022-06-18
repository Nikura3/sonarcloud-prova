import data from "./../../images/data.jpg";
function companyInfo() {
    return (
        <div className="poster mt-3" id="scopri">
            <div className="poster__img">
                <img src={data} alt="" />
            </div>
            <div className="poster__content">
                <h3 className="big-text">Zucchetti S.p.A</h3>
                <p data-testid="company-info">Da oltre 40 anni Aziende, Professionisti e Associazioni di Categoria trovano in Zucchetti un partner che realizza soluzioni con la tecnologia più avanzata.Oggi siamo la prima software house in Italia per fatturato e con noi puoi acquisire importanti vantaggi competitivi e avere un business di successo.<br />Un'ampia e innovativa offerta di soluzioni software, hardware e servizi ti permette di disporre della migliore soluzione sul mercato e di avvalerti di un unico Partner in grado di soddisfare le tue esigenze tecnologiche.</p>
            </div>
        </div>
    );
}
export default companyInfo;