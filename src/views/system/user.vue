<template>
  <div>
    {{ todo }}
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"
import getEnv from "@/utils/config"

const appBaseApi = getEnv("VITE_APP_BASE_API")
const envName = getEnv("VITE_APP_ENV_NAME")

defineOptions({
  name: "User",
})

const todo = ref("")

const fetchTodo = async () => {
  const res = await axios.get(`${appBaseApi}/todos/1`)
  todo.value = res.data
}

console.log("envName", envName)
fetchTodo()
</script>
