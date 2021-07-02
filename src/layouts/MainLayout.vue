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
        <q-input dark dense standout label="Search" v-model="text" input-class="text-right" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
      <q-toolbar class="col-3 bg-primary">
        <q-space />
        <q-tabs>
          <div class="row q-px-md text-white">
            <div v-if="isLoggedIn">
              <q-btn flat @click="$router.push('/creator')" icon="add"/>
              <q-btn flat @click="logout" label="Log out"/>
            </div>
            <div class="row" v-else>
              <q-route-tab to="/login" label="Login"/>
              <q-route-tab to="/register" label="Register"/>
            </div>
          </div>
        </q-tabs>
        <q-avatar outlined v-if="isLoggedIn" :key="update">
          <img clickable v-if="avatar" :src="avatar" @click="$router.push('/profile')">
          <img v-else clickable src="~assets/avatar.png" @click="$router.push('/profile')">
          <q-badge v-if="notifications > 0" rounded color="red" floating @click="notifications=0">{{notifications}}</q-badge>
        </q-avatar>
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data () {
    return {
      text: '',
      notifications: 0,
      avatar: this.$store.state.forum.user_avatar,
      update: 0
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.forum.accessToken;
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
    }
  }
}
</script>
