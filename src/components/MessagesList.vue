<template>
  <div class="q-pl-md q-py-md q-pr-xl">
    <!-- <template
      v-for="message in messages"
      :key="message.date"
    >
      <div tabindex="0" class="row no-wrap q-mb-xs q-pb-xs items-end">
        <div class="badge-alias text-left">
          <q-badge
            :label="message.author.alias"
            :color="writer.uuid === message.author.uuid ? 'primary' : 'secondary'"
            :outline="writer.uuid !== message.author.uuid"
          />
        </div>
        <div class="">
          {{ message.text }}
        </div>
      </div>
    </template> -->
    <template
      v-for="message in messages"
      :key="message.date"
    >
      <q-chat-message
        :name="message.author.alias"
        :text="message.messages"
        :sent="writer.uuid === message.author.uuid"
        :stamp="message.date"
      />
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { date } from 'quasar';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MessagesList',
  setup() {
    const $store = useStore();
    const messages = computed(() => $store.getters['channel/getConversation']);
    const writer = computed(() => $store.state.writer);

    return {
      messages,
      writer,
      date,
    };
  },
});
</script>

<style lang="sass" scoped>
.badge-alias
  width: 100px
</style>
