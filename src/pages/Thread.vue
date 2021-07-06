<template>
  <q-page class="row justify-center">
    <div class="column q-pa-sm q-ma-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:1000px;">
          <q-card-section>
            <div class="row justify-between" :key="updateList">
              <q-btn dense round flat icon="arrow_back" @click="$router.go(-1)"/>
              <q-btn dense round flat :color="btnColor" :icon="btnIcon" @click="followThread" />
            </div>
            <div class="q-px-lg q-ma-lg text-h4">
              {{ title }}
              <q-separator />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-px-lg q-mx-sm">
              <div class="text-h6">
                {{ text }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-mt-md q-px-xl text-secondary">
              <q-list separator square class="q-px-lg" v-for="tag in tags" v-bind:key="tag.id" >
                  <div class="col">
                    #{{ tag.name }}
                  </div>
              </q-list>
            </div>
            <div class="row q-px-xl q-ma-xs items-center">
              <div class="col-1">
                <q-icon color="secondary" size="sm" name="comment"/>
                {{ number_of_posts }}
              </div>
              <div class="col-2" :key="updateList">
                <q-btn dense :outline="!clickedUp" push size="sm" color="green-5" icon="expand_less" @click="voteForThread(1)" />
                    {{ score }}
                <q-btn dense :outline="!clickedDown" push size="sm" color="red-5" icon="expand_more" @click="voteForThread(-1)" />
              </div>
              <q-space />
              <div v-if="this.user_id == this.$store.state.forum.user_id" class="col-2 text-secondary">
                <q-btn dense flat icon="edit" label="Edit" no-caps @click="$router.push({ path: `/editor/${id}` })" />
              </div>
              <div v-if="this.user_id == this.$store.state.forum.user_id" class="col-2 text-secondary">
                <q-btn dense flat icon="delete" label="Delete" no-caps @click="deleteThread" />
              </div>
              <div class="col-2 text-secondary">
                {{ moment(created_at).format('DD/MM/YYYY HH:mm:ss') }}
              </div>
              <div class="col-2">
                <div class="column items-center">
                  <q-avatar size="50px">
                    <img v-if="author[0].avatar_url" :src="author[0].avatar_url" alt="user_avatar">
                    <img v-else src="https://4um.polarlooptheory.pl/img/avatar.png" alt="user_avatar">
                  </q-avatar>
                  {{ author[0].name }}
                </div>
              </div>
            </div>
            <q-separator/>
          </q-card-section>
          <q-card-section>
            <div class="q-px-lg">
              <template>
                <div class="q-pa-sm">
                  <q-input v-model="postText" label="Type your comment here" filled type="text" counter maxlength="255" class="full-height q-pt-md" :input-style="{ resize: 'none' }">
                  <template v-slot:after>
                    <q-btn round flat icon="send" @click="addPost" />
                  </template>
                  </q-input>
                </div>
              </template>
            </div>
          </q-card-section>

          <q-card-section>
            <template>
              <div class="div" :key="updateList">
            <q-list separator square class="q-px-lg q-ma-md" v-for="(post, index) in posts" v-bind:key="post.id" >
                <template :post="post">
                  <q-item outlined class="column q-pt-md q-ma-md shadow-1">
                    <q-item-section class="col">
                      {{ post.text }}
                    </q-item-section>
                    <q-item-section class="col q-pt-sm">
                      <div class="row items-end">
                        <!--<div class="col-2 items-center">
                          <q-btn dense flat size="md" color="green" icon="expand_less" />
                            0
                          <q-btn dense flat size="md" color="red" icon="expand_more" />
                        </div>-->
                        <div class="col-2">
                          <q-btn dense flat size="md" color="secondary" no-caps label="Reply" icon="reply" @click="showMe(index)" />
                        </div>
                        <div v-if="post.user_id == logged_user_id" class="col-2 text-secondary">
                          <q-btn dense flat icon="delete" no-caps label="Delete" @click="deletePost(post.id, index)" />
                        </div>
                        <q-space />
                        <div class="col-3 items-start text-secondary">
                          {{ moment(post.created_at).format('DD/MM/YYYY HH:mm:ss')  }}
                        </div>
                        <div class="col-2">
                          <div class="column items-center">
                            <q-avatar size="50px">
                              <img v-if="post.author[0].avatar_url" :src="post.author[0].avatar_url" alt="user_avatar">
                              <img v-else src="https://4um.polarlooptheory.pl/img/avatar.png" alt="user_avatar">
                            </q-avatar>
                            {{ post.author[0].name }}
                          </div>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>

                  <q-list separator square class="q-pl-lg q-ma-md">
                        <q-item outlined class="column q-pt-md q-ma-md shadow-1" v-for="comment in post.comments" :key="comment.id">
                          <q-item-section class="col">
                            {{ comment.text }}
                          </q-item-section>
                          <q-item-section class="col q-pt-sm">
                            <div class="row items-end">
                              <!--<div class="col-2 items-center">
                                <q-btn dense flat size="md" color="green" icon="expand_less" />
                                  0
                                <q-btn dense flat size="md" color="red" icon="expand_more" />
                              </div>-->
                              <div v-if="comment.user_id == logged_user_id" class="col-2 text-secondary">
                                <q-btn dense flat icon="delete" no-caps label="Delete" @click="deleteComment(comment.id)" />
                              </div>
                              <q-space />
                              <div class="col-3 items-start text-secondary q-px-md">
                                {{ moment(comment.created_at).format('DD/MM/YYYY HH:mm:ss')  }}
                              </div>
                              <div class="col-2">
                                <div class="column items-center">
                                  <q-avatar size="50px">
                                    <img v-if="comment.author[0].avatar_url" :src="comment.author[0].avatar_url" alt="user_avatar">
                                    <img v-else src="https://4um.polarlooptheory.pl/img/avatar.png" alt="user_avatar">
                                  </q-avatar>
                                  {{ comment.author[0].name }}
                                </div>
                              </div>
                            </div>
                          </q-item-section>
                        </q-item>
                        <div class="q-px-lg" v-show="showInput[index]" :key="updateList">
                          <div class="q-pa-sm">
                            <q-input v-model="commentText" label="Type your answer here" filled type="text" counter maxlength="255" class="full-height q-pt-md" :input-style="{ resize: 'none' }">
                            <template v-slot:after>
                              <q-btn squared flat icon="send" @click="addComment(post.id)" />
                            </template>
                            </q-input>
                          </div>
                      </div>
                    </q-list>
                  </template>
                </q-list>
                </div>
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueCookies from "vue-cookies";
import Vue from "vue";
import moment, { now } from "moment";
import { Notify } from 'quasar'

Vue.use(VueCookies);
export default {
  created () {
    this.retrieveData();
  },
  mounted () {
    let pusher = new Pusher('4c6c0d7a3990f71c7c1d', {
      cluster: 'eu'
    });
    let threadChannel = pusher.subscribe('thread-update-'+this.$route.params.id);
    var wtf = this.test();

    threadChannel.bind('thread-updated', this.test.bind(this));
  },

  props: ['post'],
  data () {
    return {
      updateList: 0,
      clickedUp: false,
      clickedDown: false,
      logged_user_id: this.$store.state.forum.user_id,
      favorite: false,
      btnColor: 'default',
      btnIcon: 'favorite_border',
      postText: '',
      commentText: '',
      id: null,
      user_id: null,
      title: 'aaa',
      text: '',
      created_at: null,
      updated_at: null,
      deleted_at: null,
      number_of_followers: null,
      score: null,
      posts: [
        {
          id: null,
          user_id: null,
          thread_id: null,
          text: '',
          created_at: null,
          updated_at: null,
          deleted_at: null,
          accepted: 1,
          comments: [
            {
              id: null,
              text: '',
              user_id: null,
              post_id: null,
              created_at: null,
              updated_at: null,
              deleted_at: null
            }
          ]
        }
      ],
      number_of_posts: null,
      tags: [],
      votes: [
        {
          name: '',
          pivot: [
            {
              thread_id: null,
              user_id: null,
              value: null,
              created_at: null,
              updated_at: null
            }
          ]
        }
      ],
      followers: [
        {
          name: '',
          user_id: null
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
      ],
      showInput: [],
      isFollowing: false
    }
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    showMe(id) {
      this.showInput[id] = !this.showInput[id];
      this.updateList +=1;
    },
    retrieveData() {
      this.$axios
          .request({
            url: '/api/forum/get-thread?thread_id='+this.$route.params.id,
            method: 'get',
            baseURL: 'https://www.4um.polarlooptheory.pl',
            headers: {
                'Authorization': "Bearer " + VueCookies.get("token")
            }
          })
          .then(response => {
            this.id = response.data.data.id;
            this.user_id = response.data.data.user_id;
            this.title = response.data.data.title;
            this.text = response.data.data.text;
            this.created_at = response.data.data.created_at;
            this.updated_at = response.data.data.updated_at;
            this.deleted_at = response.data.data.deleted_at;
            this.number_of_followers = response.data.data.number_of_followers;
            this.score = response.data.data.score;
            this.posts = response.data.data.posts;
            this.number_of_posts = response.data.data.number_of_posts;
            this.tags = response.data.data.tags;
            this.votes = response.data.data.votes;
            this.followers = response.data.data.followers;
            this.author = response.data.data.author;
            for (var i=0; i<this.number_of_posts; i++){
              this.showInput[i] = false;
            }
            for (const vote of this.votes) {
              if (vote.pivot.user_id == this.logged_user_id) {
                if (vote.pivot.value == 1) {
                  this.clickedUp = true;
                  this.clickedDown = false;
                }
                else if (vote.pivot.value == -1) {
                  this.clickedUp = false;
                  this.clickedDown = true;
                }
                else {
                  this.clickedUp = false;
                  this.clickedDown = false;
                }
              }
            }
            for (const follower of this.followers) {
              if (follower.user_id == this.logged_user_id) {
                this.isFollowing = true
                this.btnColor = 'red'
                this.btnIcon = 'favorite'
              }
            }

          })
    },
    changeMe() {

      this.favorite=!this.favorite;

      if (this.favorite == false) {
        this.btnColor = 'default'
        this.btnIcon = 'favorite_border'
      }
      else {
        this.btnColor = 'red'
        this.btnIcon = 'favorite'
      }
    },
    deleteThread() {
      this.$store.dispatch("forum/deleteThread", {
        thread_id: this.id,
        quasar: this.$q
      });
    },
    addPost() {
      this.$store.dispatch("forum/sendPost", {
        text: this.postText,
        thread_id: this.id,
        quasar: this.$q
      });
      this.postText = '';
      Notify.create({
        message: "Wait, your post is being verfied",
        caption: moment(now()).format('DD/MM/YYYY HH:mm:ss'),
      });
    },
    addPost2() {
      this.$axios
        .request({
          url: '/api/forum/add-post',
          method: 'post',
          baseURL: 'https://www.4um.polarlooptheory.pl',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + VueCookies.get("token")
          },
          data:{
            text: this.postText,
            thread_id: this.id,
          }
        })
        .then(response => {
          if (response.status === 200) {
            console.log("Post sent successfully");
            this.postText = ''
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    deletePost(id, index) {
      this.$store.dispatch("forum/deletePost", {
        post_id: id,
        quasar: this.$q
      });
      //this.posts.splice(index, 1);
      //this.updateList+=1;

    },
    addComment(id) {
      this.$store.dispatch("forum/sendComment", {
        text: this.commentText,
        post_id: id,
        quasar: this.$q
      });
      this.commentText = ''
      //this.retrieveData();
      //this.updateList+=1;
    },
    deleteComment(id) {
      this.$store.dispatch("forum/deleteComment", {
        comment_id: id,
        quasar: this.$q
      });
      //this.retrieveData();
      //this.updateList+=1;
    },
    voteForThread(score) {
      if(this.clickedUp && score==1){
        this.clickedUp = false;
        this.$store.dispatch("forum/voteForThread", {
        thread_id: this.id,
        score: 0,
        quasar: this.$q
      });

      }
      else if(this.clickedDown && score==-1){
        this.clickedDown = false;
        this.$store.dispatch("forum/voteForThread", {
        thread_id: this.id,
        score: 0,
        quasar: this.$q
      });

      }
      else if(!this.clickedUp && !this.clickedDown){
        if(score>0){
          this.clickedUp = true;
        }
        else if(score<0){
          this.clickedDown = true;
        }
        this.$store.dispatch("forum/voteForThread", {
        thread_id: this.id,
        score: score,
        quasar: this.$q
      });

      }
      //this.retrieveData();
      //this.updateList +=1;
    },
    followThread() {

      if(this.isFollowing){
        this.$store.dispatch("forum/followThread", {
          thread_id: this.id,
          follow: 0,
          quasar: this.$q
        });
        this.isFollowing = false;
        this.btnColor = 'default'
        this.btnIcon = 'favorite_border'
      }
      else {
        this.$store.dispatch("forum/followThread", {
          thread_id: this.id,
          follow: 1,
          quasar: this.$q
        });
        this.isFollowing = true;
        this.btnColor = 'red'
        this.btnIcon = 'favorite'
      }

      //this.retrieveData();
      //this.updateList +=1;
    },

    test() {
      this.retrieveData();
      console.log("Thread data retrieved");
    }
	}
}
</script>
