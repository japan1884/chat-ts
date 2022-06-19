<script lang="ts" setup>
// props
type Props = {
  type: 'email' | 'password',
  // 今回はemailとpasswordのinputしかないので 'email' | 'password' としています。より汎用的にしたい場合は 'text' | 'number' | 'tel' などを追加するといいと思います。
  id: string,
  label: string,
  modelValue: string,
};

const props = defineProps<Props>();

// emits
type Emits = {
  (event: 'update:modelValue', modelValue: string): void
};

const emits = defineEmits<Emits>();

const uniqueKey = `${props.id}-${crypto.randomUUID()}`;
const handleInput = (e: Event): void => {
  // eはイベントの情報が格納されたEventオブジェクト型です。e.target(Event.target)は、イベントが発生した要素(Element)です。
  // instanceofは継承関係を確認する演算子です。以下はe.targetが<input>要素か確認しています。
  // e.targetがinputの場合は、value属性をもっているので、e.target.valueを取得できます。仮にe.targetが<div>や<p>のときはvalue属性を持たないので、エラーとなります。
  // このようにEvent.targetの型が不明なため(nullの場合もある)、型を安全にしてあげる必要があります。
  // TypeScriptのEventの扱いは面倒くさいです。e: Eventではなく、e: anyとするとJavaScriptのように書けるので、そこまでの厳密さを求めない場合などは、anyでいいと思います。
  // DisplayName.vueの@changeは面倒だったので、e: anyで書いてます。
  if (e.target instanceof HTMLInputElement) {
    emits('update:modelValue', e.target.value);
  }
};
</script>

<template>
  <div class="form-outline mb-4">
    <input :type="props.type" :id="uniqueKey" class="form-control form-control-lg" :value="props.modelValue" @input="handleInput($event)"/>
    <label class="form-label" :for="uniqueKey">{{ props.label }}</label>
  </div>
</template>