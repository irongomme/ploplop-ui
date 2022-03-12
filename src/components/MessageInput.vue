<template>
  <q-input
    @keypress.enter.prevent="addMessage"
    name="message"
    v-model="message"
    class="q-mx-sm"
    bg-color="dark"
    autofocus
    outlined
  >
    <template v-slot:prepend>
      <q-btn
        @click="setNewIdentity()"
        icon="mdi-incognito"
        round
        flat
      >
        <q-tooltip
          :offset="[10, 10]"
          anchor="center right"
          self="center left"
        >
          Changer d'identité
        </q-tooltip>
      </q-btn>
      <q-badge
        :label="`${writer.alias}`"
        color="primary"
        class="q-ml-sm"
      />
    </template>
    <template v-slot:append>
      <q-btn
        @click="addMessage"
        :disabled="message.trim().length === 0"
        icon="mdi-send"
        round
        flat
      />
    </template>
  </q-input>
</template>

<script>
import {
  defineComponent,
  computed,
  // shallowRef,
  ref,
} from 'vue';
import { useStore } from 'vuex';
import { socket } from 'boot/socket.io';

export default defineComponent({
  name: 'MessageInput',
  setup() {
    const $store = useStore();
    const message = ref('');
    const writer = computed(() => $store.state.writer);

    function addMessage() {
      if (message.value.trim().length === 0) {
        return;
      }

      const socketMessage = {
        author: $store.state.writer,
        text: message.value,
        date: Date.now(),
      };

      socket.emit(
        'message',
        $store.state.channel.name,
        socketMessage,
      );

      // $store.dispatch('channel/addMessage', socketMessage);

      message.value = '';
    }

    function setNewIdentity() {
      $store.dispatch('writer/setNewIdentity');
    }

    return {
      message,
      writer,
      addMessage,
      setNewIdentity,
    };
  },
});
</script>
