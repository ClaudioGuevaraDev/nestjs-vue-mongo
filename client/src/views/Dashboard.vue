<template>
  <h1>Dashbaord</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  mounted() {
    const userStore = useUserStore();
    console.log(userStore.username);
    console.log(userStore.email);
    console.log(userStore.logged);
  },
});
</script>
