<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { computed, defineProps, reactive } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const { data } = defineProps<{
  data: { name: string; quantity: number }[];
}>();

const propsData = computed(() => data);

const chartData = reactive({
  labels: propsData.value.map((item) => item.name),
  datasets: [
    {
      data: propsData.value.map((item) => item.quantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 3 / 4,
  plugins: {
    legend: {
      display: false,
    },
  },
});
</script>
