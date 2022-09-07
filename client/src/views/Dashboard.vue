<template>
  <NavbarComponent/>
  <h1>Dashbaord</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from '../components/NavbarComponent.vue'

export default defineComponent({ components: { NavbarComponent } });
</script>
