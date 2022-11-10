import React from 'react'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function VerticalBar (props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    drawTicks: false,
    tension: 0.5,
    type: 'line',
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: props.maxTick,
          fontSize: 20
        },
        grid: {
          display: false
        },
        display: true,
        title: {}
      },
      y: {
        ticks: {
          maxTicksLimit: 5
        },
        grid: {
          display: false
        },
        display: true,
        title: {
          display: true,
          text: '[mol/m²]'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart'
      }
    }
  }

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.values,
        fill: true,
        pointColor: 'transparent',
        pointBorderColor: 'transparent',
        backgroundColor: context => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 250)
          gradient.addColorStop(0, 'rgb(228, 63, 90,1)')
          gradient.addColorStop(1, 'rgb(228, 63, 90, 0)')
          return gradient
        }
      }
    ]
  }

  return (
    <Line
      style={{ height: '100%', width: '100%' }}
      options={options}
      data={data}
    />
  )
}

export default VerticalBar
