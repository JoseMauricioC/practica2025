<script setup lang="ts">
import type { Persona } from '@/models/persona'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'personas'
const personas = ref<Persona[]>([])
const emit = defineEmits(['edit'])
const personaDelete = ref<Persona | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  personas.value = await http.get(ENDPOINT).then((response) => response.data)
}

const personasFiltrados = computed(() => {
  return personas.value.filter((persona) =>
    persona.nombreCompleto.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(persona: Persona) {
  emit('edit', persona)
}

function mostrarEliminarConfirm(persona: Persona) {
  personaDelete.value = persona
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${personaDelete.value?.id}`)
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
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre" />
      </InputGroup>
    </div>
    <table style="text-align: center; border-collapse: collapse" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Profesion</th>
          <th>Nombre y Apellido</th>
          <th>Fotografia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(persona, index) in personasFiltrados" :key="persona.id">
          <td>{{ index + 1 }}</td>
          <td>{{ persona.profesion.nombreCompleto }}</td>
          <td>{{ persona.nombreCompleto }}</td>
          <td>
            <img
              v-if="persona.fotografia"
              :src="persona.fotografia"
              alt="fotografia"
              height="80px"
            />
          </td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(persona)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              severity="danger"
              text
              @click="mostrarEliminarConfirm(persona)"
            />
          </td>
        </tr>
        <tr v-if="personasFiltrados.length === 0">
          <td colspan="5">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '30rem' }"
    >
      <p>
        ¿Estás seguro de que deseas eliminar la persona
        <strong style="color: orange">{{ personaDelete?.nombreCompleto }}</strong
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
</template>

<style scoped></style>
