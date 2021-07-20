<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row no-wrap shadow-2">
      <q-toolbar class="col-9 bg-primary text-white" >
        <q-avatar square>
          <img clickable alt="4um logo" src="~assets/logo.png" @click="redirect">
        </q-avatar>
        <q-toolbar-title>
          4um - your forum
        </q-toolbar-title>
        <!--
        <q-input dark dense standout label="Search" v-model="text" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        -->
      </q-toolbar>
      <q-toolbar class="col-3 bg-primary">
        <q-space />
        <q-tabs>
          <div class="row q-px-md text-white">
            <div class="row" v-if="isLoggedIn">
              <q-btn flat @click="$router.push('/creator')" icon="add"/>
              <q-btn flat @click="$router.push('/favorities')" icon="favorite"/>
              <div v-if="(role == 'admin' || role == 'moderator')">
                <q-btn flat @click="$router.push('/verify')" label="Verify posts"/>
              </div>
              <q-btn flat @click="logout" label="Log out"/>
            </div>
            <div class="row" v-else>
              <q-route-tab to="/login" label="Login"/>
              <q-route-tab to="/register" label="Register"/>
            </div>
          </div>
        </q-tabs>
        <div class="col-2" v-if="isLoggedIn&&notification>0">
          <q-chip color="red" text-color="white" clickable size="md" >
            <q-avatar outlined v-if="isLoggedIn" :key="update">
              <img clickable v-if="avatar" :src="avatar" @click="$router.push('/profile')">
              <img v-else clickable src="https://4um.polarlooptheory.pl/img/avatar.png" @click="$router.push('/profile')">
            </q-avatar>
            <div @click="$router.push('/notifications')" >
              {{ notification }}
            </div>
          </q-chip>
        </div>
        <div class="col-2" v-else>
          <q-chip color="transparent" text-color="transparent">
            <q-avatar outlined v-if="isLoggedIn" :key="update">
              <img clickable v-if="avatar" :src="avatar" @click="$router.push('/profile')">
              <img v-else clickable src="https://4um.polarlooptheory.pl/img/avatar.png" @click="$router.push('/profile')">
            </q-avatar>
          </q-chip>
        </div>
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  mounted() {
    this.notifications = this.$store.state.forum.notifications.length;
    this.avatar = this.$store.state.forum.user_avatar;

    this.$on('load', () => {
      vm.$forceUpdate();
      console.log("Loaded");
    });

  },
  data () {
    return {
      text: '',
      notifications: 0,
      avatar: null,
      update: 0
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.forum.accessToken;
    },
    role() {
      return this.$store.state.forum.user_role;
    },
    notification() {
      return this.$store.state.forum.notifications.length;
    }
  },
  methods: {
    redirect() {
      if (this.isLoggedIn) {
        this.$router.push('/');
        this.update +=1;
      }
    },
    logout() {
      // eslint-disable-next-line no-undef
      this.$store.dispatch("forum/logout", {});
      this.$root.$emit('unsubscribe');
    }
  }
}
</script>
