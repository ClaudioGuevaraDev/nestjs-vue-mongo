<template>
  <NavbarComponent />

  <div class="row mt-3">
    <TaskForm
      :insert-task="insertTask"
      :task="task"
      :update-list-task="updateListTask"
    ></TaskForm>
    <TaskList
      :tasks="tasks"
      :delete-task="deleteTask"
      :update-task="updateTask"
    ></TaskList>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import { ITask } from "../interfaces/task.interface";

export default defineComponent({
  components: { NavbarComponent, TaskForm, TaskList },
  data() {
    return {
      tasks: [] as ITask[],
      task: {
        title: "",
        description: "",
        id: "",
        buttonTitle: "Crear Tarea",
      },
    };
  },
  methods: {
    insertTask(task: ITask) {
      this.tasks = [...this.tasks, task];
    },
    updateListTask(task: ITask) {
      this.tasks = this.tasks.map((t: ITask) =>
        t._id === task._id ? task : t
      );
    },
    async deleteTask(id: string) {
      await axios.delete(`/api/tasks/${id}`);
      this.tasks = this.tasks.filter((task: ITask) => task._id !== id);
    },
    async updateTask(task: ITask) {
      this.task = {
        buttonTitle: "Editar Tarea",
        description: task.description,
        id: task._id,
        title: task.title,
      };
    },
  },
  async mounted() {
    const response = await axios.get("/api/tasks");
    this.tasks = response.data.data;
  },
});
</script>
