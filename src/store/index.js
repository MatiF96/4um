import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
// eslint-disable-next-line no-unused-vars
import forum from "./forum";
Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store( {

  modules: {
    forum: forum
  }
}
);
