<template>
  <v-form v-model="formValid" @submit.prevent="register">
    <v-card-title class="text-center">Register</v-card-title>

    <v-card-text class="d-flex flex-column ga-4">
      <v-text-field
        v-model="fullName"
        label="Full name"
        type="text"
        :rules="FULL_NAME_RULES"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        :rules="EMAIL_RULES"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="PASSWORD_RULES"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        :rules="confirmPasswordRules"
        variant="outlined"
        required
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" variant="outlined" type="submit">Register</v-btn>
      <v-btn to="/auth/login">Login</v-btn>

      <v-spacer></v-spacer>

      <v-btn to="/auth/forgot-password">Forgot Password?</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RootState } from '../../store';
import {
  FULL_NAME_RULES,
  EMAIL_RULES,
  PASSWORD_RULES,
  CONFIRM_PASSWORD_RULES,
} from '../../constanst';
import { useRouter } from 'vue-router';

const $store = useStore<RootState>();
const router = useRouter();

const formValid = ref(false);
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const confirmPasswordRules = computed(() =>
  CONFIRM_PASSWORD_RULES.map((rule) =>
    typeof rule === 'function'
      ? (v: string) => rule(v, { password: password.value })
      : rule,
  ),
);

const register = () => {
  if (!formValid.value) return;

  $store
    .dispatch('auth/register', {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    })
    .then(() => {
      router.push({ name: 'project' });
    });
};
</script>
