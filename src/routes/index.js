import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";





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
    path:"/list",
    name:"TestsList",
    component: (()=> import('@/view/tests/TestsList.vue')),
    meta:{roles: ['ADMIN']}
  },
  {
    path:"/category",
    name:"Category",
    component: (()=>import('@/view/category/Category.vue')),
    meta:{roles: ['ADMIN']}
  },
  {
    path: "/test",
    name: "TestCreate",
    component: (()=> import('@/view/tests/CreateTest.vue')),
    meta: { roles: ['ADMIN'] },
    children:[
      {
        path :'one',
        component:(()=>import('@/view/tests/OneTest.vue'))
      },
      {
        path:'more',
        component:(()=> import('@/view/tests/MoreTest.vue'))
      },
      {
        path: 'close',
        component:(()=>import('@/view/tests/ClosedTest.vue'))
      }
    ]
  },
  // profile vue
  {
    path: '/profile',
    name:"Profile",
    component: (()=> import('@/view/profile/Profile.vue')),
    meta: { roles: ['SELLER', 'ADMIN'] }
  }
];

const router = createRouter({
  history: createWebHistory(),


  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});



let userRole =  'ADMIN'
router.beforeEach((to, from,next) => {
  userRole = sessionStorage.getItem('userRole')
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
