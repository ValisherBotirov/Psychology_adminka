import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";

import Users from "../view/users/UsersView.vue";




const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { roles: ['SELLER', 'ADMIN'] }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: 'login'  }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { roles: ['ADMIN'] }
  },
  // profile vue
  {
    path: '/profile',
    name:"Profile",
    component: (()=> import('@/view/profile/Profile.vue')),
    meta: { roles: ['SELLER', 'ADMIN'] }
  },

//   products vue
  {
    path: "/products",
    name: "Products",
    component: (()=>import('@/view/products/Products.vue')),
    meta: { roles: ['SELLER', 'ADMIN'] }
  },
  {
    path: "/products/add",
    name: "ProductsCreate",
    component: (()=>import('@/view/products/ProductCreate.vue')),
    meta: { roles: ['SELLER', 'ADMIN'] }
  },
//     category
  {
    path:'/category',
    name:"Category",
    component: (()=>import('@/view/category/CategoryView.vue')),
    meta: {roles: ['ADMIN']}

  },

  // sellers
  {
    path:"/sellers",
    name:"Sellers",
    component:(()=> import('@/view/sellers/Sellers.vue')),
    meta: {roles: ['ADMIN']}
  },
  // SingSellers
  {
    path:'/singSellers',
    name:"SingSellers",
    component:(()=>import('@/view/sellers/SingSellers.vue')),
    meta: {roles: ['ADMIN']}
  }
];

const router = createRouter({
  history: createWebHistory(),


  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});



let userRole =  'SELLER'
router.beforeEach((to, from,next) => {
  userRole = sessionStorage.getItem('userRole')
  console.log(userRole)
  const isAuthenticated = Number(sessionStorage.getItem("isRegister")) ? Number(sessionStorage.getItem("isRegister")) :0  ;
  if(!isAuthenticated){
    if (to.name !== 'Login' && !isAuthenticated) {
      next({ name: 'Login' });
    }
    else next()
  }
 else{
    if(to.meta?.roles?.includes(userRole) && isAuthenticated){
      next()
    }
    else{
      next({ name: 'home' })
    }
  }

  return false
})
export default router;
