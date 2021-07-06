import VueCookies from "vue-cookies";
import Vue from "vue";

Vue.use(VueCookies);

export default function () {
  return {
    accessToken: null,
    email: null,
    user_id: VueCookies.get("user_id"),
    user_role: VueCookies.get("user_role"),
    user_avatar: VueCookies.get("user_avatar"),
    notifications: []
  }
}
