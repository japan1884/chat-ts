<script lang="ts" setup>
// props
const props = defineProps<{ displayName: string }>();
// emits
const emits = defineEmits<{ (event: 'updateName', name: string): void }>();
</script>

<template>
  <h5 class="card-title">
    <label for="display-name" class="form-label">あなたのお名前</label>
    <input
        id="display-name"
        class="form-control form-control-lg"
        type="text"
        name="displayName"
        :value="props.displayName"
        @change="(e: any) => emits('updateName', e.target.value)"/>
  </h5>
</template>