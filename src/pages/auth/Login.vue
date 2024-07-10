<template>
  <v-form v-model="formValid" @submit.prevent="handleLogin">
    <v-card-title class="text-center">Login</v-card-title>

    <v-card-text class="d-flex flex-column ga-4">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="outlined"
        :rules="EMAIL_RULES"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        variant="outlined"
        :rules="PASSWORD_RULES"
        required
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" variant="outlined" type="submit">Login</v-btn>
      <v-btn text to="/auth/register">Register</v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/auth/forgot-password">Forgot Password?</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMAIL_RULES, PASSWORD_RULES } from '../../constanst';
import { useStore } from 'vuex';
import { RootState } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore<RootState>();
const router = useRouter();

const formValid = ref(false);
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (!formValid.value) return;

  store
    .dispatch('auth/login', {
      email: email.value,
      password: password.value,
    })
    .then(() => {
      router.push('/');
    });
};
</script>
