import { defineStore } from "pinia"
import defaultSettings from "@/settings"
import { useStorage } from "@vueuse/core"

export const useSettingsStore = defineStore("setting", () => {
  // state
  const tagsView = useStorage<boolean>("tagsView", defaultSettings.tagsView)
  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo)

  const layout = useStorage<string>("layout", defaultSettings.layout)

  // actions
  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param
    switch (key) {
      case "tagsView":
        tagsView.value = value
        break
      case "sidevarLogo":
        sidebarLogo.value = value
        break
      case "layout":
        layout.value = value
        break
      default:
        break
    }
  }

  return {
    tagsView,
    sidebarLogo,
    layout,
    changeSetting,
  }
})
