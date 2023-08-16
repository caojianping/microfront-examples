<template>
  <div class="system-one">
    <p>{{ state.title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'SystemOne',
  setup() {
    const state = reactive({
      title: '我是系统组件01',
    });
    return { state };
  },
});
</script>

<style scoped>
.system-one {
  background-color: bisque;
}
</style>
