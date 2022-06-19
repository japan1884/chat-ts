import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";
import './index.css';
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDfuq9pltQnOZkrCHd5yMAxd6_3nwn0-0s",
    authDomain: "chat-ts-project.firebaseapp.com",
    projectId: "chat-ts-project",
    storageBucket: "chat-ts-project.appspot.com",
    messagingSenderId: "655759037707",
    appId: "1:655759037707:web:ef2fcf23717f1ad03ffe0e"
};
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app');
