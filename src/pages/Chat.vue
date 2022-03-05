<template>
  <q-page>
    <MessagesList />
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        @click.prevent="backToHome"
        icon="mdi-close"
        color="primary"
        fab
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';
import { useStore } from 'vuex';
import MessagesList from 'components/MessagesList.vue';

export default defineComponent({
  name: 'Chat',
  components: {
    MessagesList,
  },
  setup() {
    const $store = useStore();
    $store.dispatch('channel/setName', $store.$router.currentRoute.value.params.channel);

    function backToHome() {
      $store.dispatch('channel/setName', '');
      $store.$router.push('/');
    }

    return {
      channel: $store.state.channel.name,
      backToHome,
    };
  },
});
</script>
