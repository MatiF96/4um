<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Pusher from 'pusher-js';
import { Notify } from 'quasar'
import moment from "moment";
export default {
  name: 'App',
  beforeCreate () {
    this.$store.dispatch('forum/loadToken');
  },
  mounted () {
    let pusher = new Pusher('4c6c0d7a3990f71c7c1d', {
      cluster: 'eu'
    });

    /**
     * Channele które są do dyspozycji:
     * - notification-ID (ID to id użytkownika) np. processed-posts-1
     * - processed-posts-ID (ID to id użytkownika) np. processed-posts-1
     *
     * notification-ID otrzymuje eventy typu:
     * - comment-received
     * - post-received
     *
     * processed-posts-ID otrzymuje eventy typu:
     * - post-processed
     *
     * TODO: fajnie gdybyś dodał:
     * - obsługę notyfikacji, chmurki na dole już się pokazują
     * - odświeżenie danych przy odebraniu notyfikacji
     * - możesz usunąć console logi
     */
    let notificationChannel = pusher.subscribe('notification-23');
    notificationChannel.bind('comment-received', function(data) {
      console.log(data);
      Notify.create({
        group: 'comment-received',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });
    notificationChannel.bind('post-received', function (data) {
      console.log(data);
      Notify.create({
        group: 'post-received',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });

    let processedPostsChannel = pusher.subscribe('processed-posts-23');
    processedPostsChannel.bind('post-processed', function (data) {
      console.log(data);
      Notify.create({
        type: 'info',
        group: 'post-processed',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });
  }
}
</script>
