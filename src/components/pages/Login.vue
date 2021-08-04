<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-light-blue">
        <q-card
            square
            style="width: 400px; padding:50px"
        >
          <q-card-section>
            <div class="text-h6">
              Login
            </div>
          </q-card-section>

          <q-form
              class="q-gutter-md"
              @submit="onSubmit"
          >
            <q-card-section>
              <q-input
                  id="email"
                  v-model.trim="user.email"
                  type="email"
                  label="Email"
                  autofocus
                  :rules="validations.email"
                  lazy-rules
              />
              <q-input
                  id="password"
                  v-model="user.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  :rules="validations.password"
                  lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                      :name="showPassword ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions>
              <q-btn
                  label="Login"
                  color="light-blue-7"
                  :loading="loading"
                  type="submit"
                  unelevated
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {ref, inject} from "vue"
import { useQuasar, Cookies } from 'quasar'
import { useRouter } from 'vue-router'

import isEmail from 'validator/es/lib/isEmail'

export default {
  name: "Login",
  setup(props, context) {
    const router = useRouter()
    const $auth = inject('$auth')
    const $q = useQuasar()

    const user = ref({
      email: '',
      password: ''
    })

    const showPassword = ref(false)

    const loading = ref(false)

    const validations = ref({
      email: [
          value => !!value || 'Field is required.',
          value => isEmail(value) || 'A valid email address is required.'
      ],
      password: [value => !!value || 'Field is required.']
    })

    const onSubmit = () => {
      loading.value = true

      $auth.login(user.value).then((resp) => {
        Cookies.set('authorization_token', resp.data.token)
        router.replace('protected-route')
      }).catch((error) => {
        $q.notify({
          message: error.response.data.error || error.message,
          color: 'red',
          icon: 'error'
        })
      }).finally(() => {
        loading.value = false
      })
    }

    return {
      user,
      showPassword,
      loading,
      validations,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>
