const apiRouter = {
  path: "/api",
  redirect: "/api/apidoc",
  component: "Layout",
  meta: {
    title: "接口",
    icon: "api",
    hidden: false,
    roles: ["ADMIN"],
    keepAlive: true,
  },
  children: [
    {
      path: "apidoc",
      component: "demo/api-doc",
      name: "Apidoc",
      meta: {
        title: "接口文档",
        icon: "api",
        hidden: false,
        roles: ["ADMIN"],
        keepAlive: true,
      },
    },
    {
      path: "apidoc2",
      component: "demo/api-doc2",
      name: "Apidoc2",
      meta: {
        title: "接口文档2",
        icon: "api",
        hidden: false,
        roles: ["ADMIN"],
        keepAlive: true,
      },
    },
  ],
}

export default apiRouter
