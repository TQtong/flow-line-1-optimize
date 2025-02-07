<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { init } from './index';

const container = useTemplateRef('cesiumContainer')

onMounted(() => {
  init(container.value as HTMLDivElement)
})

</script>

<template>
  <div ref="cesiumContainer" id="container"></div>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
