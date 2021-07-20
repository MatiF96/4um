<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:500px;height:750px;">
          <q-card-section>
            <q-btn dense round flat icon="arrow_back" @click="$router.go(-1)"/>
            <div class="q-px-lg q-mt-lg">
              Change your password:
              <q-separator />
              <q-form @submit="onSubmit" class="q-pa-md">
                <q-input dense square v-model="old_password" type="password" label="Old password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <q-input dense square v-model="new_password" type="password" label="New password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <q-input dense square v-model="confirm_password" type="password" label="Confirm new password">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <q-card-actions class="q-px-lg q-mt-lg">
                  <q-btn unelevated size="md" color="primary" class="full-width text-white" label="Confirm" type="submit" />
                </q-card-actions>
              </q-form>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-px-lg">
              Change avatar:
              <q-separator />
              <div class="column q-pa-md items-center">
                <div class="row">
                  <q-avatar size="150px" :key="update">
                    <img v-if="avatar_url" :src="avatar_url" >
                    <img v-else src="~assets/avatar.png" >
                  </q-avatar>
                  <div class="absolute-center q-mt-xl q-ml-xl q-pl-xl">
                    <q-file rounded borderless use-chips accept=".jpg, image/*" v-model="file" >
                      <q-icon name="mode_edit_outline" size="md"/>
                    </q-file>
                  </div>
                </div>
              </div>
              <div class="q-pa-md">
                <q-card-actions class="q-px-lg q-mt-xl">
                  <q-btn unelevated size="md" color="primary" class="full-width text-white" label="Confirm" @click="editAvatar" />
                </q-card-actions>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {

    data() {
      return {
        update: 0,
        old_password: '',
        new_password: '',
        confirm_password: '',
        file: null,
        avatar_url: this.$store.getters['forum/getUserAvatar'],
        voted: false,
        commented: true,
        answered: true,
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch("forum/editUser", {
          user_id: this.$store.state.forum.user_id,
          password: this.new_password,
          password_confirmation: this.confirm_password,
          quasar: this.$q
        });
      },
      editAvatar() {
        if (this.file) {
          this.$store.dispatch("forum/editAvatar", {
          user_id: this.$store.state.forum.user_id,
          avatar: this.file,
          quasar: this.$q
          });
        }
      },
      upload_avatar(e){
        this.file = e.target.files[0];
      },
    }
  }
</script>
