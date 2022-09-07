<template>
  <div role="alert" v-if="message !== ''" :class="class">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: String,
    class: String,
  },
});
</script>
