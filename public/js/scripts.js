// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10, 8, 6], // Example data for five bars
      name: 'Products',
    },
  ],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: ['flowers', 'cardigans', 'toys'], // Example categories for five bars
    title: {
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      show: true,
      color: '#55596e',
    },
    axisTicks: {
      show: true,
      color: '#55596e',
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Count',
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// Update chart title
document.querySelector('.chart-title').innerText = 'Top 3 Products';






// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Purchase Orders',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Orders',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Purchase Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales Orders',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();


document.addEventListener("DOMContentLoaded", () => {
  const products = [
      {
          thumbnail: 'https://via.placeholder.com/50',
          name: 'Product 1',
          sku: '1234',
          price: '$50',
          stock: 'In Stock',
          category: 'Category 1',
          visibility: 'Visible',
          dateAdded: '2024-05-10'
      },
      {
          thumbnail: 'https://via.placeholder.com/50',
          name: 'Product 2',
          sku: '5678',
          price: '$75',
          stock: 'Out of Stock',
          category: 'Category 2',
          visibility: 'Hidden',
          dateAdded: '2024-04-22'
      }
  ];

  const productTableBody = document.querySelector("#productTable tbody");

  function renderProducts(products) {
      productTableBody.innerHTML = '';
      products.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><input type="checkbox"></td>
              <td><img src="${product.thumbnail}" alt="${product.name}" /></td>
              <td>${product.name}</td>
              <td>${product.sku}</td>
              <td>${product.price}</td>
              <td>${product.stock}</td>
              <td>${product.category}</td>
              <td>${product.visibility}</td>
              <td>${product.dateAdded}</td>
              <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
          `;
          productTableBody.appendChild(row);
      });
  }

  renderProducts(products);

  document.querySelector("#searchInput").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
      renderProducts(filteredProducts);
  });

  document.querySelector("#selectAll").addEventListener("change", (e) => {
      const checkboxes = document.querySelectorAll("#productTable tbody input[type='checkbox']");
      checkboxes.forEach(checkbox => {
          checkbox.checked = e.target.checked;
      });
  });
});
