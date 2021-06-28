<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:1200px;">
          <q-card-section>
            <div class="q-px-lg q-ma-md text-h6">
              Notifications:
              <q-separator />
              <q-field class="q-pt-md" color="grey-4" label-color="primary" outlined label="Commented" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline text-subtitle3" tabindex="0" @click="$router.push('/thread/'+threads[0].id)">{{ threads[0].title }}</div>
                  </template>
              </q-field>
              <q-field class="q-pt-md" color="grey-4" label-color="primary" outlined label="Comment answered" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-subtitle3" tabindex="0" @click="$router.push('/thread/'+threads[1].id)">{{ threads[1].title }}</div>
                </template>
              </q-field>
              <q-field class="q-pt-md" color="grey-4" label-color="primary" outlined label="Votes changed" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-subtitle3" tabindex="0" @click="$router.push('/thread/'+threads[2].id)">{{ threads[2].title }}</div>
                </template>
              </q-field>
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
  name: 'Notifications',

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
  }
}
</script>
