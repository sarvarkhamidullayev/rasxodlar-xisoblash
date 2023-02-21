const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/wallet",
      },
      {
        path: "/wallet",
        component: () => import("pages/TransactionsPage.vue"),
        meta: {
          page: "Kassa",
        },
      },
      {
        path: "/transaction",
        component: () => import("pages/TransactionForm.vue"),
        meta: {
          page: "Qoshish",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
