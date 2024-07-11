<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const { data } = defineProps<{
  data: { name: string; quantity: number }[];
}>();

// alto maximo de la grafica
const chartData = {
  labels: data.map((item) => item.name),
  datasets: [
    {
      data: data.map((item) => item.quantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 3 / 4,
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>
