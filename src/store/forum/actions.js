import axios from 'axios'
import VueCookies from "vue-cookies";
import Vue from "vue";

Vue.use(VueCookies);
export function retrieveToken (context, credentials) {

  axios
    .post("https://www.4um.polarlooptheory.pl/api/authentication/login", null, {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    })

    .then(response => {
      if (response.status === 200) {
        console.log("Success");

        VueCookies.set("token", response.data.data.token, Infinity);
        VueCookies.set("user_id", response.data.data.user.id, Infinity);
        VueCookies.set("user_avatar", response.data.data.user.avatar_url, Infinity);
        this.commit("forum/updateEmail", credentials.email);
        this.commit("forum/updateAccessToken", response.data.data.token);
        this.commit("forum/updateUserId", response.data.data.user.id);
        this.commit("forum/updateUserAvatar",response.data.data.user.avatar_url);
        this.$router.push("/", () => {});
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function loadToken (context){
  this.commit("forum/updateAccessToken",VueCookies.get("token"));
}

export function logout (context) {
  VueCookies.remove("token");
  VueCookies.remove("email");
  VueCookies.remove("user_id");
  VueCookies.remove("user_avatar");
  context.commit("updateAccessToken", VueCookies.get("token"));

  console.log("logged out");
  this.$router.push("/login", () => {});
}

export function register(context, credentials) {

  axios
    .post("https://www.4um.polarlooptheory.pl/api/authentication/register", null, {
      params:{
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation,
      }
    })

    .then(response => {
      if (response.status === 200) {
        console.log("Registered successfully");
        this.$router.push("/login", () => {});
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function sendThread(context, data) {
        axios
          .request({
            url: '/api/forum/add-thread',
            method: 'post',
            baseURL: 'https://www.4um.polarlooptheory.pl',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + VueCookies.get("token")
            },
            data:{
              title: data.title,
              text: data.text,
              tags: data.tags
            }
          })
          .then(response => {
            if (response.status === 200) {
              console.log("Thread sent successfully");
              this.$router.push("/", () => {});
            }
          })
          .catch(error => {
            console.log(error);
          })
}

export function editThread(context, data) {
  axios
    .request({
      url: '/api/forum/edit-thread',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        title: data.title,
        text: data.text,
        thread_id: data.thread_id,
        tags: data.tags
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Thread edited successfully");
        this.$router.go(-1)
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function deleteThread(context, data) {
  axios
    .request({
      url: '/api/forum/delete-thread',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        thread_id: data.thread_id,
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Thread deleted successfully");
        this.$router.push("/", () => {});
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function sendPost(context, data) {
  axios
    .request({
      url: '/api/forum/add-post',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        text: data.text,
        thread_id: data.thread_id,
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Post sent successfully");
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function deletePost(context, data) {
  axios
    .request({
      url: '/api/forum/delete-post',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        post_id: data.post_id,
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Post deleted successfully");
        //this.$router.go(this.$router.currentRoute);
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function sendComment(context, data) {
  axios
    .request({
      url: '/api/forum/add-comment',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        text: data.text,
        post_id: data.post_id,
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Comment sent successfully");
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function deleteComment(context, data) {
  axios
    .request({
      url: '/api/forum/delete-comment',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        comment_id: data.comment_id,
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Comment deleted successfully");
        //this.$router.go(this.$router.currentRoute);
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function voteForThread(context, data) {
  axios
    .request({
      url: '/api/forum/vote-for-thread',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        thread_id: data.thread_id,
        score: data.score
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Voted successfully");
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function editUser(context, credentials) {
  axios
    .request({
      url: '/api/user/edit-user',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data:{
        user_id: credentials.user_id,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Password changed successfully");
        this.$router.go(this.$router.currentRoute);
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function editAvatar(context, data) {
  let formData = new FormData();
  formData.append('user_id', data.user_id);
  formData.append('avatar', data.avatar);

  axios
    .request({
      url: '/api/user/edit-avatar',
      method: 'post',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      data: formData
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Avatar changed successfully");
        axios
          .request({
            url: '/api/user/get-user',
            method: 'get',
            baseURL: 'https://www.4um.polarlooptheory.pl',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + VueCookies.get("token")
            },
            params: {
              user_id: context.state.user_id
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.commit("forum/updateUserAvatar", response.data.data.avatar_url);
              console.log("Changed successfully");
              VueCookies.set("user_avatar", context.state.user_avatar, Infinity);
              this.$router.go(this.$router.currentRoute);
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    })
    .catch(error => {
      console.log(error);
    })
}
export function loadAvatar (context){

  axios
    .request({
      url: '/api/user/get-user',
      method: 'get',
      baseURL: 'https://www.4um.polarlooptheory.pl',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + VueCookies.get("token")
      },
      params: {
        user_id: this.$store.state.forum.user_id
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.commit("forum/updateUserAvatar", response.data.data.avatar_url);
        console.log("Changed successfully");
        VueCookies.set("user_avatar", context.state.user_avatar, Infinity);
      }
    })
    .catch(error => {
      console.log(error);
    })
}
