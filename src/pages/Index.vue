<template>
  <q-page class="flex flex-center">

    <q-input
      @keypress.enter.prevent="enterChannel"
      :placeholder="defaultChannelName"
      name="channel"
      v-model="channel"
      maxlength="42"
      style="width: 480px;"
      autofocus
      rounded
      outlined
    >
      <template v-slot:before>
        <q-icon name="mdi-pound" />
      </template>

      <template v-slot:append>
        <q-btn
          @click.prevent="enterChannel"
          icon="mdi-rocket-launch"
          round
          flat
        />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $store = useStore();

    const defaultChannelName = 'tombouctou';
    const channel = computed({
      get: () => $store.state.channel.name,
      set: (name) => { $store.dispatch('channel/setName', name); },
    });

    function enterChannel() {
      $store.$router.push(`/${channel.value === '' ? defaultChannelName : channel.value}`);
    }

    return {
      channel,
      defaultChannelName,
      enterChannel,
    };
  },
});
</script>
