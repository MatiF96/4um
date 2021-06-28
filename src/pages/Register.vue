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
                <h4 class="text-h4 text-white q-my-md">Register!</h4>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-px-sm q-pt-lg q-pb-lg">
              <q-input square v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input square v-model="confirmed_password" type="password" label="Confirm Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-card-actions class="q-px-sm q-mt-lg">
                <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Sign up" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card-section>
          <div class="absolute-bottom text-center">
            <q-separator />
            <q-card-section class="text-center q-pa-sm">
              <p class="text-grey-6">Already have an account? Sign in
                <router-link to="/login">
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
  name: 'Register',
  data () {
    return {
      email: null,
      username: null,
      password: null,
      confirmed_password: null
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("forum/register", {
        name: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmed_password,
        quasar: this.$q
      });
    }
  }
}
</script>
