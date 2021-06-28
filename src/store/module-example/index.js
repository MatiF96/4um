import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {

  getters: {

  },
  state: {
    accessToken: null,
    email: VueCookies.get("email")
  },
  mutations:
  {
    updateEmail: (state, email) => {
      state.email = email;
    },
    updateAccessToken: (state,accessToken) => {
      state.accessToken = accessToken;
    }
  },
  actions:
  {
    retrieveToken: function(context, credentials) {

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

            VueCookies.set("token", response.data.token, Infinity);
            this.commit("updateEmail", credentials.email);
            this.commit("updateAccessToken",response.data.token)
            this.$router.push("/", () => {});
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
