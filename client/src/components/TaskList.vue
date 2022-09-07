<script lang="ts">
import { defineComponent } from "vue";
import { ITask } from "../interfaces/task.interface";

export default defineComponent({
  props: {
    tasks: Array<ITask>,
    deleteTask: {
      type: Function,
      required: true,
    },
    updateTask: {
      type: Function,
      required: true,
    },
  },
});
</script>

<template>
  <div class="col-md-5">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <th>{{ task.title }}</th>
          <th>{{ task.description }}</th>
          <th>
            <button class="btn btn-warning" @click="updateTask(task)">
              Editar
            </button>
            <button class="btn btn-danger" @click="deleteTask(task._id)">
              Eliminar
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
