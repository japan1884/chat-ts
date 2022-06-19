<script lang="ts" setup>
import View from '../chat/View.vue';
import Send from '../chat/Send.vue'
import DisplayName from '../chat/DisplayName.vue';
import Header from '../utils/Header.vue';
import {reactive} from 'vue'
import {Chat, Data} from "../../types";
import {getAuth, updateProfile} from "firebase/auth";
import {getDatabase, ref, push, onValue} from "firebase/database";
import {useRouter} from "vue-router";

const user = getAuth().currentUser;
const router = useRouter();
const refMessage = ref(getDatabase(), 'chat');
const dataState = reactive<Data>({
  user,
  chat: [],
  input: '',
  displayName: user?.displayName ?? '自分さん'
});

const pushMessage = (message: string): void => {
  if (!dataState.user) {
    window.alert('ログインしていません');
    router.push({name: 'login'});
    return;
  }
  const chatData: Chat = {
    message,
    uid: dataState.user.uid,
    displayName: dataState.displayName
  };
  const db = getDatabase();
  push(ref(db, 'chat'), chatData);
};
const updateChat = (snap: any): void => {
  dataState.chat = [];
  for (const key in snap) {
    dataState.chat.push({
      message: snap[key].message,
      uid: snap[key].uid,
      displayName: snap[key].displayName
    });
  }
};
const updateDisplayName = (name: string) => {
  if (!dataState.user) {
    window.alert('ログインしていません');
    router.push({name: 'login'});
    return;
  }
  updateProfile(dataState.user, {
    displayName: name
  }).then(_ => {
    dataState.displayName = name;
    window.alert('名前の変更に成功しました');
  }).catch(e => {
    window.alert('名前の変更に失敗しました');
    console.log(e);
  });
};
onValue(refMessage, (snapshot) => {
  const data = snapshot.val();
  updateChat(data);
});
</script>

<template>
  <Header/>
  <div class="container">
    <DisplayName :display-name="dataState.displayName" @updateName="updateDisplayName($event)"/>
    <View :data="dataState"/>
    <Send @sendMessage="pushMessage($event)"/>
  </div>
</template>

<style scoped>

</style>