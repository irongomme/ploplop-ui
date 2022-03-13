<template>
  <q-page>
    <MessagesList />
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-fab
        @click.prevent="backToHome"
        icon="mdi-home"
        color="primary"
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
      $store.dispatch('channel/setMessages', []);
      $store.$router.push('/');
    }

    return {
      channel: $store.state.channel.name,
      backToHome,
    };
  },
  mounted() {
    if (this.$store.$router.currentRoute.value.params.channel !== null) {
      this.$socket.emit(
        'room::join',
        this.$store.$router.currentRoute.value.params.channel,
        this.$store.state.writer,
      );
    }

    this.$socket.on('connected', () => {
      console.log('connected');
      this.$socket.emit(
        'room::join',
        this.$store.$router.currentRoute.value.params.channel,
        this.$store.state.writer,
      );
    });

    this.$socket.on('message::sent', (message) => {
      if (message.room.uuid === this.$store.state.channel.uuid) {
        this.$store.dispatch('channel/addMessage', message);
      }
    });
    this.$socket.on('room::joined', (payload) => {
      this.$store.dispatch('channel/setChannel', payload.room);

      if (payload.room.name === this.$store.state.channel.name) {
        this.$store.dispatch('channel/setMessages', payload.messages);
      }
    });
  },
  beforeUnmount() {
    this.$socket.emit(
      'room::leave',
      this.$store.state.channel.uuid,
      this.$store.state.writer,
    );
  },
});
</script>
