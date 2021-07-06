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

    let notificationChannel = pusher.subscribe('notification-'+this.$store.state.forum.user_id);

    var wtf = this.getNotifications();

    notificationChannel.bind('comment-received', this.getNotifications.bind(this));
    notificationChannel.bind('comment-received', function (data) {
      Notify.create({
        group: 'comment-received',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });

    notificationChannel.bind('post-received', this.getNotifications.bind(this));
    notificationChannel.bind('post-received', function (data) {
      Notify.create({
        group: 'post-received',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });

    let processedPostsChannel = pusher.subscribe('processed-posts-'+this.$store.state.forum.user_id);
    processedPostsChannel.bind('post-processed', this.getNotifications.bind(this));
    processedPostsChannel.bind('post-processed', function (data) {
      Notify.create({
        type: 'info',
        group: 'post-processed',
        message: data.message,
        caption: moment(data.created_at).format('DD/MM/YYYY HH:mm:ss'),
      });
    });
    this.$root.$on('unsubscribe', () => {
      notificationChannel = pusher.unsubscribe('notification-'+this.$store.state.forum.user_id);
      processedPostsChannel = pusher.unsubscribe('notification-'+this.$store.state.forum.user_id);
      console.log("done");
    });
  },
  methods: {
    getNotifications() {
      this.$store.dispatch("forum/getNotifications");
    }
  }
}
</script>
