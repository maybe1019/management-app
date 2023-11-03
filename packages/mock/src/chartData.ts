import randomArray from './randomArray';

export const generateChartData = () => ({
  labels: Array(10).fill('02/06'),
  datasets: [
    {
      label: 'Risk score',
      backgroundColor: 'rgba(255,255,255,0.0)',
      borderColor: '#034286',
      data: randomArray(10, 10000),
    },
  ],
});

export const chartData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateChartData());
