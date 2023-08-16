<template>
  <div class="system-c02">
    <p>{{ state.title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "SystemTwo",
  setup() {
    const state = reactive({
      title: "我是系统组件02",
    });
    return { state };
  },
});
</script>

<style scoped lang="scss"></style>
