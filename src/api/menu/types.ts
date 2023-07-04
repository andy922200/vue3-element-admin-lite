import { MenuTypeEnum } from "@/enums/MenuTypeEnum"

/**
 * 菜单视图对象类型
 */
export interface MenuVO {
  children?: MenuVO[]
  component?: string
  icon?: string
  id?: number
  name?: string
  parentId?: number
  perm?: string
  redirect?: string
  routeName?: string
  routePath?: string
  sort?: number
  type?: MenuTypeEnum
  visible?: number
}

/**
 * 菜单表单对象类型
 */
export interface MenuForm {
  id?: string
  parentId?: number
  name?: string
  visible: number
  icon?: string
  sort: number
  component?: string
  path?: string
  redirect?: string
  type: MenuTypeEnum
  perm?: string
}
