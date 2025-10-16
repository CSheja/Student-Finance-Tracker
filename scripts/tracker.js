// tracker.js will help me set the main logic to initialize UI and draw chart
let myChart = null;

document.addEventListener('DOMContentLoaded', () => {
  window.ui.init();
  drawChart(); 
  window.drawChart = drawChart;
});

function drawChart() {
  const recs = window.appState.getRecords();
  const sums = [0,0,0,0,0,0,0];
  
  recs.forEach(r => {
    const d = new Date(r.date);
    const wd = d.getDay();
    sums[wd] += Number(r.amount);
  });

  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data = [sums[1], sums[2], sums[3], sums[4], sums[5], sums[6], sums[0]];

  const ctx = document.getElementById('myChart').getContext('2d');

  // Destroy previous chart to redraw cleanly
  if (myChart) {
    myChart.destroy();
  }

  //  Create new chart
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Spending (RWF)',
        data: data,
        backgroundColor: '#7fff7f'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#c0f0c0' }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#c0f0c0'
          }
        }
      }
    }
  });
}

