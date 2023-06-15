import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import type { ChartData, ChartOptions } from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function fillTextMultiLine(ctx: any, text: string, x: number, y: number) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

const plugins = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart: any, args: any, options: any) => {
    const ctx = chart.ctx;
    const yAxis = chart.scales.y;
    const yStart = yAxis.top;
    const yEnd = yAxis.bottom;
    const gradient = ctx.createLinearGradient(0, yStart, 0, yEnd);

    gradient.addColorStop(1, 'rgba(255, 0, 0, 0.2)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.2)');
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.2)');

    ctx.fillStyle = gradient;
    ctx.fillRect(chart.chartArea.left, yStart, chart.chartArea.right - chart.chartArea.left, yEnd - yStart);
  },
  afterDraw: (chart: any, args: any, options: any) => {
    const ctx = chart.ctx;
    const yAxis = chart.scales.y;
    const yStart = yAxis.top;
    const yEnd = yAxis.bottom;
    var yLabels = yAxis.ticks.map((tick: any) => {
      console.log(tick);
      return tick.value;
    });
    // 레이블 설정
    var labelA = 'PROFOUND\n(120-90)';
    var labelB = 'SEVERE\n(90~70)';
    var labelC = 'MODERATELY\nSEVERE\n(55~70)';
    var labelD = 'MODERATE\n(40~55)';
    var labelE = 'MILD\n(25~40)';
    var labelF = 'NORMAL\n(-10~25)';

    // 레이블 위치 설정
    const labelAStart = 0;
    const labelAEnd = 3;

    const labelBStart = 3;
    const labelBEnd = 5;

    const labelCStart = 5;
    const labelCEnd = 6.5;

    const labelDStart = 6.5;
    const labelDEnd = 8;

    const labelEStart = 8;
    const labelEEnd = 9.5;

    const labelFStart = 9.5;
    const labelFEnd = 13;

    // console.log(labelDStart, labelAEnd, labelBStart, labelBEnd, labelCStart, labelCEnd);

    // 레이블 텍스트 스타일 설정
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const totalHeight = yStart + (yEnd - yStart);
    const margin = 54.5;
    const step = (totalHeight - margin) / 13 / 2;

    // 레이블 출력
    fillTextMultiLine(ctx, labelA, chart.chartArea.right + 15, totalHeight - ((labelAStart + labelAEnd) * step));
    fillTextMultiLine(ctx, labelB, chart.chartArea.right + 15, totalHeight - ((labelBStart + labelBEnd) * step));
    fillTextMultiLine(ctx, labelC, chart.chartArea.right + 15, totalHeight - ((labelCStart + labelCEnd) * step) - 8);
    fillTextMultiLine(ctx, labelD, chart.chartArea.right + 15, totalHeight - ((labelDStart + labelDEnd) * step));
    fillTextMultiLine(ctx, labelE, chart.chartArea.right + 15, totalHeight - ((labelEStart + labelEEnd) * step));
    fillTextMultiLine(ctx, labelF, chart.chartArea.right + 15, totalHeight - ((labelFStart + labelFEnd) * step));
  }
}

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'TEST-DIN Result',
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 90,
          yMax: 90,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
        line2: {
          type: 'line',
          yMin: 70,
          yMax: 70,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
        line3: {
          type: 'line',
          yMin: 55,
          yMax: 55,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
        line4: {
          type: 'line',
          yMin: 40,
          yMax: 40,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
        line5: {
          type: 'line',
          yMin: 25,
          yMax: 25,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        }
      }
    }
  },
  scales: {
    y: {
      suggestedMin: -10,
      suggestedMax: 120,
      ticks: {
        stepSize: 10
      },
      reverse: true
    },
    y1: {
      position: 'right',
      display: false,
      suggestedMin: -10,
      suggestedMax: 120,
      ticks: {
        stepSize: 10
      },
      reverse: true,
      afterFit(scale) {
        scale.width = 100;
      },
    }
  }
};

export const data = [
  { date: "2023-01-01", value: 10 },
  { date: "2023-02-01", value: 30 },
  { date: "2023-03-01", value: 50 },
  { date: "2023-04-01", value: 70 },
  { date: "2023-05-01", value: 90 },
  { date: "2023-06-01", value: 110 }
]


const ChartComponent = () => {
  function parseTime(time: string) {
    let parts = time.split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  const xLabels = data.map(function(d) { return d.date; });
  const yValues = data.map(function(d) { return d.value; });

  const chartData: ChartData<'line'> = {
    labels: xLabels,
    datasets: [
      {
        label: '데이터',
        data: yValues,
        pointRadius: 4,
        pointBackgroundColor: 'blue',
        pointBorderColor: 'white',
        pointHoverRadius: 7,
        showLine: false
      }
    ]
  };

  return (
    <div className="chart-component">
      <Line
      data={chartData}
      plugins={[plugins]}
      options={options}
      />
    </div>
  );

}

export default ChartComponent;

