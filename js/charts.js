const ctx = document.getElementById('stats');

export function createChart (stats) {
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'HP',
        'Attack',
        'Defense',
        ['Special', 'Attack'],
        ['Special', 'Defense'],
        'Speed'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: stats,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    },
    options: {
      plugins: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          grid: {
            color: 'white'
          },
          pointLabels: {
            color: 'white'
          },
          angleLines: {
            color: 'white'
          }
        }
      }
    }
    });
}