<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:750px;">
          <q-card-section>
            <div class="q-px-lg q-ma-md text-h6">
              Notifications:
              <q-separator />
              <q-list class="q-pt-md">
                  <q-field class="row q-pt-md" v-ripple v-for="notification in notifications" :key="notification.id" color="grey-4" label-color="primary" outlined :label="notification.message" stack-label>
                    <template v-slot:control>
                      <div class="self-center full-width no-outline text-subtitle3" tabindex="0" @click="deleteNotification(notification.id,notification.thread_id)"> {{ notification.thread_title }} </div>
                    </template>
                  </q-field>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueCookies from "vue-cookies";
import Vue from "vue";

Vue.use(VueCookies);

export default {

  data () {
    return {
      notif: [],
      titles: []
    }
  },
  computed: {
    notifications() {
      return this.$store.state.forum.notifications;
    }
  },
  methods: {
    deleteNotification(id, thread_id) {
      Promise.all([
        this.$store.dispatch("forum/deleteNotification", {
          notification_id: id,
          quasar: this.$q
        })
      ])
      .finally(() => {
        this.$router.push(`/thread/`+thread_id);
      })
    }
  }
}
</script>
