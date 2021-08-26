//官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';

//自訂分頁元件
// import HelloWorld from '@/components/HelloWorld';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Cart from '@/components/pages/Cart';
import Connection from '@/components/pages/Connection';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      //怕使用者亂輸入網址，導向到customer_order
      path: '*',
      redirect: '/'
    },   
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',  //對應虛擬路徑
      name: 'Login',  //元件呈現名稱
      component: Login,  //對應元件          
    }, 
    {
      path: '/admin',  //對應虛擬路徑
      name: 'Dashboard',  //元件呈現名稱
      component: Dashboard,  //對應元件   
      children: [
        {
          path: 'products',  //對應虛擬路徑
          name: 'Products',  //元件呈現名稱
          component: Products,  //對應元件
          meta: { requiresAuth: true }, //驗證
        },
        {
          path: 'orders',  //對應虛擬路徑
          name: 'Orders',  //元件呈現名稱
          component: Orders,  //對應元件
          meta: { requiresAuth: true }, //驗證
        },
        {
          path: 'coupons',  //對應虛擬路徑
          name: 'Coupons',  //元件呈現名稱
          component: Coupons,  //對應元件
          meta: { requiresAuth: true }, //驗證
        }
      ],
    },
    {
      path: '/cart',  //對應虛擬路徑
      name: 'Cart',  //元件呈現名稱
      component: Cart,  //對應元件
    },
    {
      path: '/connection',  //對應虛擬路徑
      name: 'Connection',  //元件呈現名稱
      component: Connection,  //對應元件
    },
    {
      path: '/customer_checkout/:orderId',  //對應虛擬路徑
      name: 'CustomerCheckout',  //元件呈現名稱
      component: CustomerCheckout,  //對應元件
    },
  ]
});

