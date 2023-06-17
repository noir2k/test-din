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

import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import jsPDF from 'jspdf';

import { ChartDataProps } from '@interfaces';

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

const fillTextMultiLine = (ctx: any, text: string, x: number, y: number) => {
  const lineHeight = ctx.measureText("M").width * 1.2;
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; ++i) {
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

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();

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
    // var yLabels = yAxis.ticks.map((tick: any) => {
    //   return tick.value;
    // });

    var labelA = 'PROFOUND\n(120-90)';
    var labelB = 'SEVERE\n(90~70)';
    var labelC = 'MODERATELY\nSEVERE\n(55~70)';
    var labelD = 'MODERATE\n(40~55)';
    var labelE = 'MILD\n(25~40)';
    var labelF = 'NORMAL\n(-10~25)';

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
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const totalHeight = yStart + (yEnd - yStart);
    const margin = 54.5;
    const step = (totalHeight - margin) / 13 / 2;

    fillTextMultiLine(ctx, labelA, chart.chartArea.right + 10, totalHeight - ((labelAStart + labelAEnd) * step));
    fillTextMultiLine(ctx, labelB, chart.chartArea.right + 10, totalHeight - ((labelBStart + labelBEnd) * step));
    fillTextMultiLine(ctx, labelC, chart.chartArea.right + 10, totalHeight - ((labelCStart + labelCEnd) * step) - 8);
    fillTextMultiLine(ctx, labelD, chart.chartArea.right + 10, totalHeight - ((labelDStart + labelDEnd) * step));
    fillTextMultiLine(ctx, labelE, chart.chartArea.right + 10, totalHeight - ((labelEStart + labelEEnd) * step));
    fillTextMultiLine(ctx, labelF, chart.chartArea.right + 10, totalHeight - ((labelFStart + labelFEnd) * step));
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

const downloadPDF = () => {
  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  const canvasImage = canvas.toDataURL('image/jpeg', 1.0);
  const { width, height } = canvas.getBoundingClientRect();

  let pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
    compress: true,
  });

  pdf.addImage(canvasImage, 'PNG', 15, 15, width, height);
  pdf.save('salerecoed.pdf');
}

const ChartComponent = (props: { data: ChartDataProps[] }) => {
  const xLabels = props.data.map(function(d) { return d.date; });
  const yValues = props.data.map(function(d) { return d.value; });

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: 'DataSet',
        data: yValues,
        pointRadius: 4,
        pointBackgroundColor: 'blue',
        pointBorderColor: 'white',
        pointHoverRadius: 7,
        showLine: false
      }
    ]
  }

  return (
    <div className="chart-component">
      <Line
        id="chart"
        data={chartData}
        plugins={[plugins]}
        options={options}
      />
      <div className="btn-wrapper">
        <button
          type='button'
          className='download-btn'
          onClick={() => downloadPDF()}>
          PDF로 저장
        </button>
      </div>
    </div>
  );

}

export default ChartComponent;

