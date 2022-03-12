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
// import { useSocket } from 'boot/socket.io';
import MessagesList from 'components/MessagesList.vue';
// import { socket } from 'boot/socket.io';

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
  beforeCreate() {
    // console.log(this.$socket);
    this.$socket.emit(
      'join_room',
      this.$store.$router.currentRoute.value.params.channel,
      this.$store.state.writer,
    );

    this.$socket.on('connected', () => {
      // console.log('connected');
      this.$socket.emit(
        'join_room',
        this.$store.$router.currentRoute.value.params.channel,
        this.$store.state.writer,
      );
    });

    this.$socket.on('message_reveive', (room) => {
      // console.log('message_reveive', room);
      if (room.name === this.$store.state.channel.name) {
        this.$store.dispatch('channel/setMessages', room.messages);
      }
    });
    this.$socket.on('room_joined', (room) => {
      // console.log('room_joined', room);
      if (room.name === this.$store.state.channel.name) {
        this.$store.dispatch('channel/setMessages', room.messages);
      }
    });
  },
  beforeUnmount() {
    this.$socket.emit(
      'leave_room',
      this.$store.$router.currentRoute.value.params.channel,
      this.$store.state.writer,
    );
  },
});
</script>
