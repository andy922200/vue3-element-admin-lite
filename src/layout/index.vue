<script setup lang="ts">
import { computed, watchEffect } from "vue"
import { useWindowSize } from "@vueuse/core"
import { AppMain, Navbar, TagsView } from "./components/index"
import Sidebar from "./components/Sidebar/index.vue"

import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"

const { width } = useWindowSize()

/**
 * Responsive Layout Container Fixed Width
 *
 * Large（>=1200px）
 * Medium（>=992px）
 * Small（>=768px）
 */
const WIDTH = 992

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const showTagsView = computed(() => settingsStore.tagsView)

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  withoutAnimation: appStore.sidebar.withoutAnimation,
  mobile: appStore.device === "mobile",
}))

watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.toggleDevice("mobile")
    appStore.closeSideBar(true)
  } else {
    appStore.toggleDevice("desktop")

    if (width.value >= 1200) {
      appStore.openSideBar(true)
    } else {
      appStore.closeSideBar(true)
    }
  }
})

function handleOutsideClick() {
  appStore.closeSideBar(false)
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <!-- Mobile Overlay -->
    <div
      v-if="classObj.mobile && classObj.openSidebar"
      class="drawer-bg"
      @click="handleOutsideClick"
    ></div>

    <Sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': 'left' }">
        <navbar />
        <TagsView v-if="showTagsView" />
      </div>

      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  &::after {
    display: table;
    clear: both;
    content: "";
  }

  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>
