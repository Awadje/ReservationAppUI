<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="authError" type="error" v-model="authError" icon="warning" :value="true" outline dismissible>
              {{authError}}
            </v-alert>
            <v-form>
              <v-text-field prepend-icon="person" v-model="email" label="Login" type="email"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat>Wachtwoord vergeten</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-on:click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { UserAPI } from '@/services'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      authError: false
    }
  },
  computed: {
    ...mapGetters('auth', [
      'authenticated',
      'user'
    ])
  },
  mounted () {
    let token = localStorage.getItem('token')

    if (token) {
      UserAPI.get(`/user/validate`).then(response => {
        this.userIsValid(response.data.user)
        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect })
        } else {
          this.$router.push({ path: '/' })
        }
      })
    }
  },
  methods: {
    ...mapActions('auth', [
      'userIsValid'
    ]),
    login () {
      UserAPI.post(`/user/login`, { email: this.email, password: this.password }).then(response => {
        console.log(response)
        if (response.data.auth) {
          this.userIsValid(response.data.profile)
          localStorage.setItem('token', response.data.token)

          if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect })
          } else {
            this.$router.push({ path: '/' })
          }
        }
      }).catch(({response}) => {
        console.log(response)
        this.authError = response.data.message
      })
    }
  }
}
</script>

<style>

</style>