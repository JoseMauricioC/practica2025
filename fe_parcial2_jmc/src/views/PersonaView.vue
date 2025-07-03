<!-- <script setup lang="ts">
import PersonaList from '@/components/persona/PersonaList.vue'
import PersonaSave from '@/components/persona/PersonaSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const personaListRef = ref<typeof PersonaList | null>(null)
const personaEdit = ref<any>(null)

function handleCreate() {
  personaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(persona: any) {
  personaEdit.value = persona
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  personaListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h1>Personas</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <PersonaList ref="personaListRef" @edit="handleEdit" />
    <PersonaSave
      :mostrar="mostrarDialog"
      :persona="personaEdit"
      :modoEdicion="!!personaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style></style> -->

<script setup lang="ts">
import PersonaList from '@/components/persona/PersonaList.vue'
import PersonaSave from '@/components/persona/PersonaSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const personaListRef = ref<typeof PersonaList | null>(null)
const personaEdit = ref<any>(null)

function handleCreate() {
  personaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(persona: any) {
  personaEdit.value = persona
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  personaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Personas</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <!-- Cambiado a personaListRef -->
    <PersonaList ref="personaListRef" @edit="handleEdit" />
    <PersonaSave
      :mostrar="mostrarDialog"
      :persona="personaEdit"
      :modoEdicion="!!personaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style></style>
