import { hexToRGB, gradientChartOptionsConfigurationWithNumbersAndGrid } from '../components/Chart'

export function daySum(data) {
    return {
        data: (canvas) => {
            var ctx = canvas.getContext("2d");
            var gradientFill = ctx.createLinearGradient(0, 230, 0, 70);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
            return {
            labels: data.date,
            datasets: [
                {
                label: "确诊人数",
                borderColor: "#18ce0f",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#18ce0f",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: data.day_sum,
                },
            ],
            };
        },
        options: gradientChartOptionsConfigurationWithNumbersAndGrid,
    }
}


export function dayIncrease(data)  {
    return {
        data: (canvas) => {
            var ctx = canvas.getContext("2d");
            var gradientFill_blue = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill_blue.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill_blue.addColorStop(1, hexToRGB("#2CA8FF", 0.4));
            var gradientFill_red = ctx.createLinearGradient(0, 480, 0, 10);
            gradientFill_red.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill_red.addColorStop(1, hexToRGB("#f96332", 0.4));
            return {
              labels: data.date,
              datasets: [
                {
                  label: "每日新增",
                  backgroundColor: gradientFill_blue,
                  borderColor: "#2CA8FF",
                  pointBorderColor: "#FFF",
                  pointBackgroundColor: "#2CA8FF",
                  pointBorderWidth: 2,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 1,
                  pointRadius: 2,
                  fill: true,
                  borderWidth: 1,
                  data: data.day_increase,
                },
                {
                  label: "七日平均",
                  type: 'line',
                  borderColor: "#f96332",
                  pointBorderColor: "#FFF",
                  pointBackgroundColor: "#f96332",
                  pointBorderWidth: 2,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 1,
                  pointRadius: 0,
                  fill: true,
                  backgroundColor: gradientFill_red,
                  borderWidth: 2,
                  data: data.seven_avg,
                }
              ],
            };
          },
          options: gradientChartOptionsConfigurationWithNumbersAndGrid,
    }
};

export function dayActive(data) {
    return {
        data: (canvas) => {
            var ctx = canvas.getContext("2d");
            var gradientFill = ctx.createLinearGradient(0, 400, 0, 30);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB("#D8BFD8", 0.3));
            return {
              labels: data.date,
              datasets: [
                {
                  label: "现存确诊 (注：03/30及之前无该数据)",
                  borderColor: "#D8BFD8",
                  pointBorderColor: "#FFF",
                  pointBackgroundColor: "#D8BFD8",
                  pointBorderWidth: 2,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 1,
                  pointRadius: 0,
                  fill: true,
                  backgroundColor: gradientFill,
                  borderWidth: 2,
                  data: data.day_active,
                },
              ],
            };
          },
        options: gradientChartOptionsConfigurationWithNumbersAndGrid,
    }
};