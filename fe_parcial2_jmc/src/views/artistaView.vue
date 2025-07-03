<!-- <script setup lang="ts">
import ArtistaList from '@/components/artista/ArtistaList.vue'
import ArtistaSave from '@/components/artista/ArtistaSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const artistaListRef = ref<typeof ArtistaList | null>(null)
const artistaEdit = ref<any>(null)

function handleCreate() {
  artistaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(artista: any) {
  artistaEdit.value = {
    ...artista,
    precioDisco: Number(artista.precioDisco ?? 0),
  }
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  artistaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Artistas</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ArtistaList ref="artistaListRef" @edit="handleEdit" />
    <ArtistaSave
      :mostrar="mostrarDialog"
      :artista="artistaEdit"
      :modoEdicion="!!artistaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style></style> -->

<script setup lang="ts">
import ArtistaList from '@/components/artista/ArtistaList.vue'
import ArtistaSave from '@/components/artista/ArtistaSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const artistaListRef = ref<typeof ArtistaList | null>(null)
const artistaEdit = ref<any>(null)

function handleCreate() {
  artistaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(artista: any) {
  artistaEdit.value = {
    ...artista,
    precioDisco: Number(artista.precioDisco ?? 0),
  }
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  artistaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="main-container">
    <h1 class="page-title">Gestión de Artistas</h1>
    <div class="actions-bar">
      <Button
        label="Crear Nuevo Artista"
        icon="pi pi-user-plus"
        @click="handleCreate"
        class="p-button-primary create-button"
      />
    </div>
    <ArtistaList ref="artistaListRef" @edit="handleEdit" />
    <ArtistaSave
      :mostrar="mostrarDialog"
      :artista="artistaEdit"
      :modoEdicion="!!artistaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.main-container {
  margin: 100px;
  padding: 2rem;
  background-color: #f9fafb; /* Un fondo suave para la página */
  min-height: 100vh;
  font-family: 'Arial', sans-serif; /* Fuente base, puedes cambiarla */
}

.page-title {
  font-size: 2.5rem;
  color: #334155; /* Color oscuro para el título */
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0; /* Una línea sutil debajo del título */
  padding-bottom: 0.5rem;
}

.actions-bar {
  display: flex;
  justify-content: flex-end; /* Alinea el botón a la derecha */
  margin-bottom: 1.5rem;
  padding: 0 1rem; /* Pequeño padding horizontal */
}

.create-button {
  background-color: #10b981 !important; /* Un verde vibrante para el botón de crear */
  border-color: #10b981 !important;
  color: white !important;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px; /* Bordes ligeramente redondeados */
  transition: all 0.2s ease-in-out; /* Transición suave al pasar el ratón */
}

.create-button:hover {
  background-color: #059669 !important; /* Un verde más oscuro al pasar el ratón */
  border-color: #059669 !important;
  transform: translateY(-2px); /* Un pequeño efecto de levantamiento */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

/* Estilos para el componente ArtistaList (asumiendo que tiene su propio estilo interno o se le puede pasar props) */
/* Si necesitas estilizar la lista directamente aquí, podrías usar un wrapper div */
</style>
