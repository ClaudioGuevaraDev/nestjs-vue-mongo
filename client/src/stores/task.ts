import axios from "axios";
import { defineStore } from "pinia";

interface ITask {
  _id: string;
  title: string;
  description: string;
}

export const useTaskStore = defineStore("task", {
  state: () => {
    return {
      tasks: [] as ITask[],
    };
  },
  actions: {
    async getTasks() {
      const response = await axios.get("/api/tasks");
      this.tasks = response.data.data;
      return response.data.data;
    },
  },
  getters: {
    listTasks(state) {
      return state.tasks;
    },
  },
});
