<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-4">
      <div class="card card-body">
        <form @submit.prevent="handleSubmit()">
          <AlertComponent :class="alert.class" :message="alert.message" />
          <div class="mb-3">
            <label for="email-input" class="form-label">Email</label>
            <input
              type="email"
              id="email-input"
              class="form-control"
              required
              autofocus
              v-model="user.email"
              placeholder="Ingresa tu email"
            />
          </div>
          <div class="mb-3">
            <label for="password-input" class="form-label">Password</label>
            <input
              type="password"
              id="password-input"
              class="form-control"
              required
              v-model="user.password"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div class="mb-2">
            <p
              class="fst-italic text-center"
              @click="redirectRegister()"
              style="cursor: pointer"
            >
              ¿No tienes una cuenta registrada?
            </p>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import AlertComponent from "../components/AlertComponent.vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  components: {
    AlertComponent,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      alert: {
        class: "",
        message: "",
      },
    };
  },
  methods: {
    redirectRegister() {
      this.$router.push("/register");
    },
    async handleSubmit() {
      const userStore = useUserStore();

      try {
        const response = await axios.post("/api/auth/login", this.user);
        userStore.$patch({
          email: response.data.user.email,
          logged: true,
          username: response.data.user.username,
        });
        this.$router.push("/dashboard");
      } catch (error: any) {
        this.user = {
          email: "",
          password: "",
        };
        this.alert = {
          class: "alert alert-danger",
          message: error.response.data.message,
        };
        userStore.$patch({
          email: "",
          logged: false,
          username: "",
        });
      }
    },
  },
});
</script>
