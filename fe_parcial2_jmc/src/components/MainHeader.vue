<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const location = useRoute()
</script>

<template>
  <div>
    <header class="site-header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 d-flex flex-wrap">
            <p class="d-flex me-4 mb-0">
              <i class="bi-person custom-icon me-2"></i>
              <strong class="text-dark">Welcome to Music Festival 2023</strong>
            </p>
          </div>
        </div>
      </div>
    </header>

    <nav
      class="navbar navbar-expand-lg"
      :style="location.path != '/' ? 'background-color: black' : ''"
    >
      <div class="container">
        <RouterLink to="/" class="navbar-brand">AAAAAAAAAAppppppppppp</RouterLink>

        <RouterLink
          v-if="!authStore.token"
          to="/login"
          class="btn custom-btn d-lg-none ms-auto me-4"
          >Login</RouterLink
        >
        <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-none ms-auto me-4"
          >Salir</a
        >

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="index.html"
          ><span class="flaticon-pizza-1 mr-1"></span>Pizza<br /><small>Delicous</small></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            <slot v-if="authStore.token">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link click-scroll">Inicio</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/personas" class="nav-link click-scroll">Personas</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/serie" class="nav-link click-scroll">Series</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/artista" class="nav-link click-scroll">Artista</RouterLink>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll">{{ authStore.user }}</a>
              </li>
            </slot>
          </ul>

          <RouterLink v-if="!authStore.token" to="/login" class="btn custom-btn d-lg-block d-none"
            >Login</RouterLink
          >
          <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-block d-none">Salir</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
