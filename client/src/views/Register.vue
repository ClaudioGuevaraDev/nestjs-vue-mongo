<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-4">
      <div class="card card-body">
        <form @submit.prevent="handleSubmit()">
          <AlertComponent :message="alert.message" :class="alert.class" />
          <div class="mb-3">
            <label for="username-input" class="form-label">Username</label>
            <input
              type="text"
              id="username-input"
              class="form-control"
              required
              autofocus
              placeholder="Ingresa tu username"
              v-model="user.username"
            />
          </div>
          <div class="mb-3">
            <label for="email-input" class="form-label">Email</label>
            <input
              type="email"
              id="email-input"
              class="form-control"
              required
              placeholder="Ingresa tu email"
              v-model="user.email"
            />
          </div>
          <div class="mb-3">
            <label for="password-input" class="form-label">Password</label>
            <input
              type="password"
              id="password-input"
              class="form-control"
              required
              placeholder="Ingresa tu contraseña"
              v-model="user.password"
            />
          </div>
          <div class="mb-3">
            <label for="confirm-password-input" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm-password-input"
              class="form-control"
              required
              placeholder="Confirma tu contraseña"
              v-model="user.confirmPassword"
            />
          </div>
          <div class="mb-2">
            <p
              class="fst-italic text-center"
              style="cursor: pointer"
              @click="redirectLogin()"
            >
              ¿Ya tienes una cuenta registrada?
            </p>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import AlertComponent from "../components/AlertComponent.vue";

export default defineComponent({
  components: {
    AlertComponent,
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      alert: {
        class: "",
        message: "",
      },
    };
  },
  methods: {
    redirectLogin() {
      this.$router.push("/");
    },
    async handleSubmit() {
      try {
        const response = await axios.post("/api/auth/register", this.user);
        this.alert = {
          class: "alert alert-success",
          message: response.data.message,
        };
      } catch (error: any) {
        this.alert = {
          class: "alert alert-danger",
          message: error.response.data.message,
        };
      }

      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.user.confirmPassword = "";
    },
  },
});
</script>
