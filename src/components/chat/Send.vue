<script lang="ts" setup>
import {ref} from "vue";

// emits
type Emits = {
  (event: 'sendMessage', message: string): void
}

const emits = defineEmits<Emits>();

const inputRef = ref<string>('');
const doSend = (): void => {
  if (inputRef.value === '') return;
  emits('sendMessage', inputRef.value);
  inputRef.value = '';
};
</script>

<template>
  <div class="input-group mb-3">
    <input
        type="text"
        class="form-control"
        placeholder="メッセージを入力してください"
        v-model="inputRef"
    />
    <button
        class="btn btn-outline-secondary js-send-message"
        type="button"
        @click="doSend()"
    >
      メッセージ送信
    </button>
  </div>
</template>