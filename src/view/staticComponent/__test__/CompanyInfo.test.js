import { render, screen } from '@testing-library/react';
import CompanyInfo from "./../CompanyInfo";
import '@testing-library/jest-dom/extend-expect';

test('controllo consistenza testo di introduzione a scatter plot', () => {
    render(<CompanyInfo />);
    const text = "Da oltre 40 anni Aziende, Professionisti e Associazioni di Categoria trovano in Zucchetti un partner che realizza soluzioni con la tecnologia più avanzata.Oggi siamo la prima software house in Italia per fatturato e con noi puoi acquisire importanti vantaggi competitivi e avere un business di successo.Un'ampia e innovativa offerta di soluzioni software, hardware e servizi ti permette di disporre della migliore soluzione sul mercato e di avvalerti di un unico Partner in grado di soddisfare le tue esigenze tecnologiche.";
    const chartInfo = screen.getByTestId("company-info");
    expect(chartInfo).toHaveTextContent(text);
});