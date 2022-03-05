<template>
  <q-input
    @keypress.enter.prevent="addMessage"
    prefix=">"
    name="message"
    v-model="message"
    style="border-bottom: 0px;"
    autofocus
    outlined
  />
</template>

<script>
import {
  defineComponent,
  shallowRef,
  ref,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MessageInput',
  setup() {
    const $store = useStore();
    const message = ref('');

    function addMessage() {
      $store.dispatch('channel/addMessage', {
        author: shallowRef($store.state.writer).value,
        text: message.value,
        date: Date.now(),
      });

      message.value = '';
    }

    return {
      message,
      addMessage,
    };
  },
});
</script>
