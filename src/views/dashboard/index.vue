<script setup lang="ts">
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Dashboard",
  inheritAttrs: false,
})

import { useUserStore } from "@/store/modules/user"

const userStore = useUserStore()
const date: Date = new Date()

const greetings = computed(() => {
  if (date.getHours() >= 6 && date.getHours() < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！"
  } else if (date.getHours() >= 8 && date.getHours() < 12) {
    return "上午好🌞！"
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午好☕！"
  } else if (date.getHours() >= 18 && date.getHours() < 24) {
    return "晚上好🌃！"
  } else if (date.getHours() >= 0 && date.getHours() < 6) {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！"
  }
})
</script>

<template>
  <div class="dashboard-container">
    <!-- 用户信息 -->
    <el-row class="mb-8">
      <el-card class="w-full">
        <div class="flex justify-between flex-wrap">
          <div class="flex items-center">
            <img
              class="user-avatar"
              :src="userStore.avatar + '?imageView2/1/w/80/h/80'"
            />
            <span class="ml-[10px] text-[16px]">
              {{ userStore.nickname }}
            </span>
          </div>

          <div class="leading-[40px]">
            {{ greetings }}:{{ $t("dashboard.greetings") }}
          </div>
        </div>
      </el-card>
    </el-row>

    <!-- 卡片 -->
    <el-row :gutter="40" class="mb-4">
      <el-col :xs="24" :sm="12" :lg="6" class="mb-4">
        <div class="data-box"></div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="mb-4">
        <div class="data-box"></div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="mb-4">
        <div class="data-box"></div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="mb-2">
        <div class="data-box"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>
