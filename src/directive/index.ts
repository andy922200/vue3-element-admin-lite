import type { App } from "vue"

import { hasPerm } from "./permission"

export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有元件中可用
  app.directive("hasPerm", hasPerm)
}
