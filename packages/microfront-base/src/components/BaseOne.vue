<template>
  <div class="base-one">
    <h1>{{ state.title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'BaseOne',
  setup() {
    const state = reactive({
      title: '我是基础组件01',
    });
    return { state };
  },
});
</script>

<style scoped>
.base-one {
  background-color: yellow;
}
</style>
