import React from 'react';
import { Line } from 'react-chartjs-2';
import { StyledDenote, TrendWidgetContainer } from './Trend.styled';
import { TrendLineMain } from './Trend.types';

// Needs import for types.. because DeFiNiTeLyTyPeD dEcLaRaTiOnS

const Sparklines = {
  hover: {
    mode: null,
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    yAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        display: false,
      },
    ],
  },
};

export const Trend: React.FC<TrendLineMain> = ({
  title = 'Trend',
  data,
  timeScale = '30d',
}) => {
  const TrendFixture = React.useMemo(
    () => ({
      labels: [0, 0, 0, 0, 0, 0, 0],
      datasets: [
        {
          label: 'My First dataset',
          lineTension: 0.1,
          backgroundColor: '#DEEEFE',
          borderColor: '#0273E2',
          borderCapStyle: 'butt',
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data,
        },
      ],
    }),
    [data]
  );
  return (
    <TrendWidgetContainer
      title={title}
      iconRight={<StyledDenote>{timeScale}</StyledDenote>}
    >
      <Line data={TrendFixture} options={Sparklines} height={72} width={232} />
    </TrendWidgetContainer>
  );
};
