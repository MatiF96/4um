<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:315px;height:550px;">
          <q-card-section class="bg-primary">
            <div class="row">
              <div class="col">
                <q-avatar square size="70px">
                  <img alt="4um logo" src="~assets/logo.png">
                </q-avatar>
              </div>
              <div class="col">
                <h4 class="text-h4 text-white q-my-md">Sign in!</h4>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form  @submit="onSubmit" class="q-px-sm q-pt-lg">
              <q-input square v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-card-actions class="q-px-sm q-mt-lg">
                <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Log in" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card-section>
          <div class="absolute-bottom text-center">
            <q-separator />
            <q-card-section class="text-center q-pa-sm">
              <p class="text-grey-6">Doesn't have an account yet? Sign up
              <router-link to="/register">
              here
              </router-link>
              </p>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('forum/retrieveToken', {
        email: this.email,
        password: this.password,
        quasar: this.$q
      });
    }
  }
}
</script>

