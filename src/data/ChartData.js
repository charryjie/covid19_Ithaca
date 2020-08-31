import { hexToRGB } from '../components/ChartBasic'

export function dataGen(labels, data) {
    return (canvas) => {
        let ctx = canvas.getContext("2d");
        return {
            labels: labels,
            datasets: data.map(d => {
                let gradientFill = ctx.createLinearGradient(0, 230, 0, 70);
                gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
                gradientFill.addColorStop(1, hexToRGB(d.color, 0.4));
                return  {
                    label: d.label,
                    type: d.type,
                    backgroundColor: gradientFill,
                    borderColor: d.color,
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: d.color,
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 0,
                    fill: true,
                    borderWidth: 2,
                    data: d.data,
                }
            })
        }
    }
}