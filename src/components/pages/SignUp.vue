<script lang="ts" setup>
import FormInput from "../utils/FormInput.vue";
import {reactive} from "vue";
import {SignUp} from "../../types";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";
import {RouterLink} from "vue-router";

const dataState = reactive<SignUp>({
  email: '',
  password: '',
  passwordReInput: ''
});

const router = useRouter();
const auth = getAuth();
const signUp = (): void => {
  if (dataState.password !== dataState.passwordReInput) {
    window.alert('再入力したパスワードが一致しません');
    return;
  }
  createUserWithEmailAndPassword(auth, dataState.email, dataState.password)
      .then((userCredential) => {
        window.alert("ユーザー作成に成功しました！");
        router.push({name: 'chat'});
      })
      .catch((error) => {
        console.log(error);
        window.alert("ユーザー作成に失敗しました");
      })
};
</script>

<template>
  <div id="app">
    <section class="vh-100">
      <div class="container py-5 vh-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem">
              <div class="card-body p-5 text-center bg-light">
                <h3 class="mb-5">Sign Up</h3>
                <FormInput type="email" id="email" label="メールアドレス" v-model="dataState.email"/>
                <FormInput type="password" id="password" label="パスワード" v-model="dataState.password"/>
                <FormInput type="password" id="passwordReInput" label="パスワード（再入力）" v-model="dataState.passwordReInput"/>
                <button class="btn btn-outline-primary btn-lg btn-block" type="submit" @click="signUp()">SignUp</button>
                <div class="mt-3">
                  <router-link :to="{name:'login'}">ログインはこちら</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>