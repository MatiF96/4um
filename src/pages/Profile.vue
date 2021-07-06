<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:500px;height:700px;">
          <q-card-section>
            <div class="absolute-top-left q-pl-lg" style="transform: translateY(50%);">
              <q-btn round @click="$router.push('/favorities')" icon="favorite" color="grey-5" />
            </div>
            <div class="absolute-top-right q-pr-lg" style="transform: translateY(50%);">
              <q-btn round @click="$router.push('/profile/settings')" icon="settings" color="grey-5" />
            </div>
            <div class="column q-pa-sm items-center">
              <q-avatar size="200px">
                <img v-if="avatar_url" :src="avatar_url">
                <img v-else src="https://4um.polarlooptheory.pl/img/avatar.png">
              </q-avatar>
              <q-field borderless label="" stack-label >
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-h6">{{ username }}</div>
                </template>
              </q-field>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-px-lg">
              <q-field filled dense prefix="Joined:">
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-right">{{ created_at.replace("T"," ").slice(0,-11) }}</div>
                </template>
              </q-field>
              <q-field filled dense prefix="Followed threads:">
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-right">{{ number_of_threads_followed }}</div>
                </template>
              </q-field>
              <q-field filled dense prefix="Votes:">
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-right">{{ number_of_votes }}</div>
                </template>
              </q-field>
              <q-field filled dense prefix="Comments:">
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-right">{{ number_of_comments }}</div>
                </template>
              </q-field>
              <div class="q-mt-xl" @click="$router.push('/notifications')">
                <q-field filled dense prefix="Notifications:">
                  <template v-slot:control>
                    <div class="self-center full-width no-outline text-right">{{ notifications }}</div>
                  </template>
                </q-field>
              </div>

            </div>
          </q-card-section>
          <!--
          <q-card-section>
            <div class="q-px-lg">
              Recent activity:
                <q-field class="q-pt-md" color="grey-4" label-color="green" outlined label="Voted (up)" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline text-subtitle1" tabindex="0">Sample title</div>
                  </template>
                </q-field>
                <q-field class="q-pt-md" color="grey-4" label-color="blue" outlined label="Commented" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline text-subtitle1" tabindex="0">Sample title</div>
                  </template>
                </q-field>
                <q-field class="q-pt-md" color="grey-4" label-color="orange" outlined label="Voted (down)" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline text-subtitle1" tabindex="0">Sample title</div>
                  </template>
                </q-field>
            </div>
          </q-card-section>
          -->
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
    beforeCreate () {
      this.$axios
          .request({
            url: '/api/user/get-user?user_id='+this.$store.state.forum.user_id,
            method: 'get',
            baseURL: 'https://www.4um.polarlooptheory.pl',
            headers: {
                'Authorization': "Bearer " + VueCookies.get("token")
            }
          })
          .then(response => {
            this.username = response.data.data.name;
            this.avatar_url = response.data.data.avatar_url;
            this.created_at = response.data.data.created_at;
            this.number_of_threads_followed = response.data.data.number_of_threads_followed;
            this.number_of_votes = response.data.data.number_of_votes;
            this.number_of_comments = response.data.data.number_of_comments;
            this.notifications = this.$store.state.forum.notifications.length;
          })
  },
    data() {
      return {
        username: '',
        avatar_url: '',
        created_at: null,
        number_of_threads_followed: null,
        number_of_votes: null,
        number_of_comments: null,
        notifications: 0
      }
    }
  }
</script>
