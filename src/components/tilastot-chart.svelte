<script>
  import { onMount, tick } from 'svelte';
  import {
    Chart,
    BarElement,
    BarController,
    CategoryScale,
    LinearScale,
    Tooltip
  } from 'chart.js';

  Chart.register(
    BarElement,
    BarController,
    CategoryScale,
    LinearScale,
    Tooltip
  );

  export let data = [];
  export let labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  let chartCanvas, chartInstance;

  const colors = [
    '#1d8c38',
    '#72a42f',
    '#c3cc16',
    '#ffe900',
    '#e5ac00',
    '#c95a00',
    '#bc000b'
  ];

  const options = {
    responsive: true,
    // animation: {
    //   duration: 1,
    //   onComplete: ctx => {
    //   }
    // },
    scales: {
      y: {
        ticks: {
          callback: value => {
            return value * 100 + '%';
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: ctx => {
            return (ctx.raw * 100).toFixed(0) + '%';
          }
        }
      }
    }
  };

  const drawChart = data => {
    if (chartInstance && data) {
      chartInstance.data.datasets.forEach(dataset => {
        dataset.data.push(data);
      });
      chartInstance.update();
    } else if (chartCanvas) {
      chartInstance = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: colors
            }
          ]
        },
        options: options
      });
    }
  };

  $: {
    tick().then(() => {
      drawChart(data);
    });
  }

  onMount(() => {
    console.log('chart mount');
  });
</script>

<style>
  .chart-parent {
    width: 99%;
  }
</style>

<div class="chart-parent"><canvas bind:this={chartCanvas} /></div>
