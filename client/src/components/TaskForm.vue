<template>
  <div class="col-md-3">
    <div class="card card-body">
      <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
          <label for="title-input" class="form-label">Title</label>
          <input
            type="text"
            id="title-input"
            class="form-control"
            placeholder="Ingresa el título"
            required
            autofocus
            v-model="task.title"
          />
        </div>
        <div class="mb-3">
          <label for="description-input" class="form-label">Description</label>
          <textarea
            id="description-input"
            rows="5"
            placeholder="Ingresa la descripción"
            class="form-control"
            required
            v-model="task.description"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success w-100">
          {{ task.buttonTitle }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    insertTask: {
      type: Function,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    updateListTask: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async handleSubmit() {
      const post = {
        title: this.task.title,
        description: this.task.description,
      };

      if (this.task.id === "") {
        const response = await axios.post("/api/tasks", post);
        this.insertTask!(response.data.data);
      } else {
        const response = await axios.put(`/api/tasks/${this.task.id}`, post);
        this.updateListTask(response.data.data);
      }
      this.task.title = "";
      this.task.description = "";
      this.task.id = 0;
      this.task.buttonTitle = "Crear Tarea";
    },
  },
});
</script>
