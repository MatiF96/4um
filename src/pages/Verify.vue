<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:1200px;">
          <q-card-section>
            <div class="q-px-lg q-ma-md">
              <div class="text-h6">
                These posts should be verified:
              </div>
              <q-separator />
                <q-list class="q-pt-md" v-if="posts.length > 0" :key="updateList">
                  <q-item class="row" clickable v-ripple v-for="post in posts" :key="post.id">
                    <q-item-section class="col-8">
                      {{ post.text }}
                    </q-item-section>
                    <q-item-section>
                      <div class="row items-center justify-end text-secondary">
                        <q-btn dense outline push color="green-5" icon="check" @click="acceptPost(post.id, 1)" />
                      </div>
                    </q-item-section>
                    <q-item-section>
                      <div class="row items-center justify-center text-secondary">
                        <q-btn dense outline push color="red-5" icon="close" @click="acceptPost(post.id, 0)" />
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

  created () {
    this.getAwaitingPosts();
  },

  data () {
    return {
      posts: [
        {
          id: null,
          user_id: null,
          text: '',
          accepted: null
        }
      ],
      updateList: 0
    }
  },

  methods: {
    getAwaitingPosts() {
      this.$axios
          .request({
            url: '/api/forum/get-awaiting-posts',
            method: 'get',
            baseURL: 'https://www.4um.polarlooptheory.pl',
            headers: {
                'Authorization': "Bearer " + VueCookies.get("token")
            }
          })
          .then(response => {
            this.posts = response.data.data;
          })
    },
    acceptPost(id, accepted) {
      this.$store.dispatch("forum/acceptPost", {
        accepted: accepted,
        post_id: id,
        quasar: this.$q
      });
      this.getAwaitingPosts();
      this.updateList+=1;
    },
  }
}
</script>
