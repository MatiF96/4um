<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:1200px;">
          <q-card-section>
            <div class="q-px-lg q-ma-md">
              <div class="text-h6">
                Most recent:
              </div>
              <q-separator />
                <q-list class="q-pt-md">
                  <q-item class="row" clickable v-ripple v-for="thread in threads" :key="thread.id" @click="$router.push({ path: `/thread/${thread.id}` })">
                    <q-item-section avatar>
                      <q-avatar size="70px">
                        <img v-if="thread.author[0].avatar_url" :src="thread.author[0].avatar_url">
                        <img v-else src="https://4um.polarlooptheory.pl/img/avatar.png">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="col-8">
                      {{ thread.title }}
                    </q-item-section>
                    <q-item-section>
                      <div class="row items-center justify-end text-secondary">
                        {{ thread.number_of_posts }}
                        <q-icon class="q-pl-sm" color="secondary" name="comment" />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      <div class="row items-center justify-center text-secondary">
                        <q-icon color="secondary" name="expand_less" />
                          {{ thread.score }}
                        <q-icon color="secondary" name="expand_more" />
                      </div>
                    </q-item-section>
                  </q-item>
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
  beforeCreate () {
    this.$axios
      .request({
        url: '/api/forum/get-threads',
        method: 'get',
        baseURL: 'https://www.4um.polarlooptheory.pl',
        headers: {
          'Authorization': "Bearer " + VueCookies.get("token")
        }
      })
      .then(response => {
        this.threads = response.data.data;
      })
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  data () {
    return {
      posts: [],
      threads: [
        {
          id: null,
          user_id: null,
          title: '',
          text: '',
          created_at: null,
          updated_at: null,
          deleted_at: null,
          number_of_followers: null,
          score: null,
          number_of_comments: null,
          tags: [
            {
              name: '',
              pivot: [
                {
                  thread_id: null,
                  tag_id: null,
                  created_at: null,
                  updated_at: null
                }
              ]
            }
          ],
          author: [
            {
              id: null,
              name: '',
              email: null,
              email_verified_at: null,
              created_at: null,
              updated_at: null,
              avatar_url: ''
            }
          ]
        }
      ],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.forum.accessToken;
    }
  }
}
</script>
