<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-white q-ma-xs">
      <MessageInput />
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import MessageInput from 'components/MessageInput.vue';

export default defineComponent({
  name: 'ChatLayout',

  components: {
    MessageInput,
  },

  setup() {
    return {
    };
  },
});
</script>
