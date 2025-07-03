<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog } from 'primevue'
import type { Artista } from '@/models/artista'

const ENDPOINT = 'artistas'
const artistas = ref<Artista[]>([])
const emit = defineEmits(['edit'])
const artistaDelete = ref<Artista | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  artistas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(artista: Artista) {
  emit('edit', artista)
}

function mostrarEliminarConfirm(artista: Artista) {
  artistaDelete.value = artista
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${artistaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table style="text-align: center; border-collapse: collapse" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Fotografia</th>
          <th>Precio de Disco</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(artista, index) in artistas" :key="artista.id">
          <td>{{ index + 1 }}</td>
          <td>{{ artista.nombre }}</td>
          <td>
            <img
              v-if="artista.fotografia"
              :src="artista.fotografia"
              alt="fotografia"
              height="80px"
            />
          </td>
          <td>{{ artista.precioDisco }}</td>

          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(artista)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              severity="danger"
              @click="mostrarEliminarConfirm(artista)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '30rem' }"
    >
      <p>
        ¿Estás seguro de que deseas eliminar el artista
        <strong style="color: orange">{{ artistaDelete?.nombre }}</strong
        >?
      </p>
      <br />
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template> -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog } from 'primevue'
import type { Artista } from '@/models/artista'

const ENDPOINT = 'artistas'
const artistas = ref<Artista[]>([])
const emit = defineEmits(['edit'])
const artistaDelete = ref<Artista | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  artistas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(artista: Artista) {
  emit('edit', artista)
}

function mostrarEliminarConfirm(artista: Artista) {
  artistaDelete.value = artista
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${artistaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div class="artist-list-wrapper">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Fotografia</th>
          <th>Precio de Disco</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(artista, index) in artistas" :key="artista.id">
          <td>{{ index + 1 }}</td>
          <td>{{ artista.nombre }}</td>
          <td>
            <img
              v-if="artista.fotografia"
              :src="artista.fotografia"
              :alt="artista.nombre || 'fotografia de artista'"
              class="artist-table-photo"
            />
          </td>
          <td>{{ artista.precioDisco }}</td>

          <td>
            <div class="table-actions">
              <Button
                icon="pi pi-pencil"
                aria-label="Editar"
                text
                @click="emitirEdicion(artista)"
                class="p-button-text p-button-secondary p-button-sm"
                v-tooltip.top="'Editar'"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                text
                severity="danger"
                @click="mostrarEliminarConfirm(artista)"
                class="p-button-text p-button-danger p-button-sm"
                v-tooltip.top="'Eliminar'"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '30rem' }"
      modal
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="confirmation-dialog-content">
        <i class="pi pi-exclamation-triangle dialog-warning-icon"></i>
        <p>
          ¿Estás seguro de que deseas eliminar al artista
          <strong class="highlight-text">{{ artistaDelete?.nombre }}</strong
          >?
        </p>
      </div>
      <template #footer>
        <div class="dialog-footer-buttons">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            @click="mostrarConfirmDialog = false"
            class="p-button-secondary p-button-outlined"
          />
          <Button type="button" label="Eliminar" severity="danger" @click="eliminar" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.artist-list-wrapper {
  padding: 1.5rem;
  background-color: var(--surface-card, #ffffff); /* Use PrimeVue var, fallback to white */
  border-radius: var(--border-radius, 8px);
  box-shadow: var(--surface-shadow, 0 2px 10px rgba(0, 0, 0, 0.08));
  overflow-x: auto; /* Ensures table is scrollable on smaller screens */
}

.styled-table {
  width: 100%;
  border-collapse: separate; /* Allows for border-radius on cells */
  border-spacing: 0; /* Remove space between cell borders */
  margin-top: 1rem;
  background-color: var(--surface-card, #ffffff);
  color: var(--text-color, #495057);
  font-family: var(--font-family, sans-serif);
  font-size: 0.95rem;
}

.styled-table thead {
  background-color: var(--surface-ground, #f8f9fa); /* Light grey for header */
  border-bottom: 2px solid var(--surface-border, #dee2e6);
}

.styled-table th {
  padding: 1rem 1.25rem;
  text-align: center;
  font-weight: 600;
  color: var(--text-color-secondary, #6c757d); /* Slightly darker text for headers */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--surface-border);
}

.styled-table td {
  padding: 0.75rem 1.25rem;
  text-align: center;
  border-bottom: 1px solid var(--surface-border, #e9ecef);
}

.styled-table tbody tr:nth-child(even) {
  background-color: var(--surface-hover, #f3f4f6); /* Stripe effect for rows */
}

.styled-table tbody tr:hover {
  background-color: var(--surface-highlight, #e0f2f7); /* Highlight on hover */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.artist-table-photo {
  width: 70px; /* Adjust size as needed */
  height: 70px;
  object-fit: cover; /* Ensures image covers the area without distortion */
  border-radius: 4px; /* Small rounded corners for photos */
  border: 1px solid var(--surface-border, #dee2e6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
}

.table-actions {
  display: flex;
  justify-content: center;
  gap: 0.25rem; /* Small gap between buttons */
}

/* --- Dialog Styling --- */
.confirmation-dialog-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0; /* Add some vertical padding */
  font-size: 1.1rem;
  color: var(--text-color, #495057);
}

.dialog-warning-icon {
  font-size: 2.5rem; /* Larger icon for warning */
  color: var(--orange-500, #ffc107); /* A warning orange color */
}

.highlight-text {
  color: var(--primary-color, #1e88e5); /* Use PrimeVue primary color or a default blue */
  font-weight: 700;
}

.dialog-footer-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* PrimeVue button specific overrides/enhancements */
.p-button-text {
  font-weight: normal; /* Override PrimeVue default bold for text buttons if desired */
}
</style>
