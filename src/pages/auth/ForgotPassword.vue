<template>
  <v-form v-model="formValid" @submit.prevent="handleForgotPassword">
    <v-card-title class="text-center">Forgot Password</v-card-title>

    <v-card-text>
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="outlined"
        :rules="EMAIL_RULES"
        required
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" variant="outlined" type="submit">
        Send reset link
      </v-btn>
      <v-btn text to="/auth/login">Login</v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/auth/register">Register</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMAIL_RULES } from '../../constanst';
import { RootState } from '@/store';
import { useStore } from 'vuex';

const $store = useStore<RootState>();

const formValid = ref(false);
const email = ref('');

const handleForgotPassword = () => {
  if (!formValid.value) return;

  $store.dispatch('auth/resetPassword', email.value);
};
</script>
