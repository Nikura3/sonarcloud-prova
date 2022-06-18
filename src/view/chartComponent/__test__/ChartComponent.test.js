import { render, screen } from '@testing-library/react';
import ChartComponent from "./../ChartComponent";
import '@testing-library/jest-dom/extend-expect';

test('controllo presenza div contenitore svg grafico', () => {
    render(<ChartComponent />);
    const chartEl = screen.getByTestId("my_dataviz");
    expect(chartEl).toBeInTheDocument();
});