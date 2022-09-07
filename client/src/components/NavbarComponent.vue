<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button class="btn btn-danger" @click="logout()">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  methods: {
    async logout() {
      const userStore = useUserStore();

      try {
        const response = await axios.get("/api/auth/logout");
        console.log(response);
        userStore.email = "";
        userStore.username = "";
        userStore.logged = false;
        this.$router.push("/");
      } catch (error) {}
    },
  },
});
</script>
