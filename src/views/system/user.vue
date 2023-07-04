<template>
  <div>
    {{ todo }}
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"

defineOptions({
  name: "User",
})

const todo = ref("")

const fetchTodo = async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_BASE_API}/todos/1`)
  todo.value = res.data
}

fetchTodo()
</script>
