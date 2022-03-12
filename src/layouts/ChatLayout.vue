<template>
  <q-layout
    view="hHh lpr lfr"
    class="q-mx-auto"
    style="max-width: 1396px;"
  >
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      bordered
    >
      PROUT
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="q-pa-md" style="background-color: inherit;">
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
      leftDrawerOpen: true,
    };
  },
});
</script>
