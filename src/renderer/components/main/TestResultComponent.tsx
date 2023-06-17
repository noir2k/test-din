import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import { ColumnType } from '@main/util';

import ChartComponent from './ChartComponent';
import { ChartDataProps } from '@interfaces';

// TODO : will be removed
// test for reload data on changed

const data_dummy: ChartDataProps[] = [
  { date: "2023-01-01", value: 10 },
  { date: "2023-02-01", value: 30 },
  { date: "2023-03-01", value: 50 },
  { date: "2023-04-01", value: 70 },
  { date: "2023-05-01", value: 90 },
  { date: "2023-06-01", value: 110 }
]

const TestResult = () => {
  const [toggle, setToggle] = useState(false);
  const [chartData, setChartData] = useState<ChartDataProps[] | null>(null);

  const chartItemData = useAppSelector((state: RootState) => state.popupToggle.chartItemData);

  useEffect(() => {
    const channel = 'graph-data';
    window.electron.ipcRenderer.sendMessage(channel, []);
  }, [chartItemData]);

  useEffect(() => {
    const channel = 'graph-data-result';
    window.electron.ipcRenderer.on(channel, (data: unknown) => {
      const colData = data as ColumnType[];
      if (colData !== null) {
        const data: ChartDataProps[] = [];
        colData.map((item) => {data.push({date: item.test_date, value: Number(item.test_result)})});
        // TODO : will be removed
        // test for reload data on changed
        if(toggle) {
          setToggle(false);
          setChartData(data_dummy);
        } else {
          setToggle(true);
          setChartData(data);
        }
        // setChartData(data);
      }
    });
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  return (
    <div className="chart-wrapper">
      <h1 id="testText" className="text-slate-950">
        검사 기록입니다.
      </h1>
      {chartData && <ChartComponent data={chartData}/>}
    </div>
  );
}

export default TestResult;
