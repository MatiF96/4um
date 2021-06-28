<template>
  <q-page class="row justify-center items-center">
    <div class="column q-pa-sm">
      <div class="row">
        <q-card square class="shadow-24" style="width:500px;height:700px;">
          <q-card-section class="bg-primary q-pa-sm">
            <div class="row items-center">
              <q-btn size="lg" color="white" dense round flat icon="arrow_back" @click="$router.go(-1)"/>
              <q-icon class="q-px-md" size="lg" dense name="post_add" color="white" />
              <h5 class="text-h5 text-white q-my-md">Thread</h5>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit">
              <div class="q-px-lg">
                <template>
                  <div class="q-pa-md">
                    <q-input class="q-pt-md" v-model="title" label="Title" filled type="text" counter maxlength="25" :input-style="{ resize: 'none' }"  />
                    <q-input v-model="text" label="Text" filled type="textarea" counter maxlength="255" class="full-height q-pt-md" :input-style="{ resize: 'none' }"  />
                    <q-input class="q-pt-lg" hint="Separate tags with space" v-model="tags" label="Tags" filled type="text" :input-style="{ resize: 'none' }"  />
                  </div>
                </template>
              </div>
              <div class="q-pa-lg q-ma-sm">
                <q-btn unelevated size="md" color="primary" class="full-width text-white" label="Send" type="submit" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      text: '',
      tags: '',
      tags_to_send: []
    }
  },
  methods: {
    onSubmit() {
      if(this.tags != "") {
        this.tags_to_send = this.tags.split(" ");
      }
      this.$store.dispatch("forum/sendThread", {
        title: this.title,
        text: this.text,
        tags: this.tags_to_send,
        quasar: this.$q
      });
    }
  }
}
</script>

