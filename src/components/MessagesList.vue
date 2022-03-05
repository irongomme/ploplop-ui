<template>
  <div class="q-ma-xs">
    <div v-for="message in messages" :key="message.date" class="q-mb-xs">
      <q-badge
        :label="writer.uuid === message.author.uuid ? 'moi' : message.author.uuid"
        :color="writer.uuid === message.author.uuid ? 'primary' : 'secondary'"
        class="q-mr-md"
        outline
      />
      {{ message.text }}
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MessagesList',
  setup() {
    const $store = useStore();
    const messages = computed(() => $store.getters['channel/getMessages']);
    const writer = { ...$store.state.writer };

    return {
      messages,
      writer,
    };
  },
});
</script>
