<template>
  <div class="system-c01">
    <p>{{ state.title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "SystemOne",
  setup() {
    const state = reactive({
      title: "我是系统组件01",
    });
    return { state };
  },
});
</script>

<style scoped lang="scss"></style>
