<script lang="ts" setup>
import FormInput from "../utils/FormInput.vue";
import {reactive} from "vue";
import {Login} from "../../types";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";
import {RouterLink} from "vue-router";

const dataState = reactive<Login>({
  email: '',
  password: ''
});

const router = useRouter();
const auth = getAuth();
const login = (): void => {
  signInWithEmailAndPassword(auth, dataState.email, dataState.password)
      .then((userCredential) => {
        window.alert("ログインに成功しました！");
        router.push({name: 'chat'});
      })
      .catch((err) => {
        console.log(err);
        window.alert("正しいログイン情報を入力してください");
      });
};
</script>

<template>
  <section class="vh-100">
    <div class="container py-5 vh-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong">
            <div class="card-body p-5 text-center bg-light">
              <h3 class="mb-5">Login</h3>
              <FormInput type="email" id="email" label="メールアドレス" v-model="dataState.email"/>
              <FormInput type="password" id="password" label="パスワード" v-model="dataState.password"/>
              <button class="btn btn-outline-primary btn-lg btn-block" type="submit" @click="login()">Login</button>
              <div class="mt-3">
                <router-link :to="{name:'signUp'}">アカウント作成はこちら</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card.shadow-2-strong {
  border-radius: 1rem;
}
</style>