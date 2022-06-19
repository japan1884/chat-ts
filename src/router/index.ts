import Login from "../components/pages/Login.vue";
import SignUp from "../components/pages/SignUp.vue";
import Chat from "../components/pages/Chat.vue";
import NotFound from "../components/pages/NotFound.vue";
import {createRouter, createWebHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const routes = [
    {
        path: "/",
        component: Chat,
        name: 'chat',
        meta: {
            auth: true
        }
    },
    {
        path: "/signup",
        component: SignUp,
        name: 'signUp'
    },
    {
        path: "/login",
        component: Login,
        name: 'login'
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ナビゲーションガード
router.beforeEach((to, from, next) => {
    if (to.matched.some((routeRecord) => routeRecord.meta.auth)) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                next();
            } else {
                next({name: 'login'});
            }
        });
    } else {
        next();
    }
});

export default router;