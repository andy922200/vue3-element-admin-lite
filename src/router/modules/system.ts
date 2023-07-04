const systemRouter = {
  path: "/system",
  redirect: "/system/user",
  component: "Layout",
  meta: {
    title: "系统管理",
    icon: "system",
    hidden: false,
    roles: ["ADMIN"],
    keepAlive: true,
  },
  children: [
    {
      path: "user",
      component: "system/user",
      name: "User",
      meta: {
        title: "用户管理",
        icon: "user",
        hidden: false,
        roles: ["ADMIN"],
        keepAlive: true,
      },
    },
  ],
}

export default systemRouter
