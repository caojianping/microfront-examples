<template>
  <div class="system-two">
    <p>{{ state.title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'SystemTwo',
  setup() {
    const state = reactive({
      title: '我是系统组件02',
    });
    return { state };
  },
});
</script>

<style scoped>
.system-two {
  background-color: green;
}
</style>
