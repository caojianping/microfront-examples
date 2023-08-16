<template>
  <div class="base-two">
    <h1>{{ state.title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'BaseTwo',
  setup() {
    const state = reactive({
      title: '我是基础组件02',
    });
    return { state };
  },
});
</script>

<style scoped>
.base-two {
  background-color: aqua;
}
</style>
