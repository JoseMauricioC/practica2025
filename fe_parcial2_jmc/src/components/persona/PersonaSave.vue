<!-- <script setup lang="ts">
import type { Persona } from '@/models/persona'
import type { Profesiones } from '@/models/profesiones'
import http from '@/plugins/axios'
import { Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'personas'
const props = defineProps({
  mostrar: Boolean,
  persona: {
    type: Object as () => Persona,
    default: () => ({}) as Persona,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

//const generos = ref<Genero[]>([])
const profesiones = ref<Profesiones[]>([])
//const artistas = ref<Artista[]>([])
//const albumes = ref<Album[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

//const artista = ref<Artista>({} as Artista)
const persona = ref<Persona>({ ...props.persona })

// async function obtenerGeneros() {
//   generos.value = await http.get('generos').then((response) => response.data)
// }
async function obtenerProfesiones() {
  profesiones.value = await http.get('profesiones').then((response) => response.data)
}

// async function obtenerArtistas() {
//   artistas.value = await http.get('artistas').then((response) => response.data)
// }

// async function obtenerAlbumes() {
//   albumes.value = await http.get(`albumes/artista/${artista.value.id}`).then((res) => res.data)
// }

async function handleSave() {
  try {
    const body = {
      idProfesion: persona.value.profesion.id,
      nombreCompleto: persona.value.nombreCompleto,
      fotografia: persona.value.fotografia,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${persona.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    persona.value = {} as Persona
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerProfesiones()
      //   obtenerGeneros()
      //   obtenerArtistas()

      //   if (props.persona.id) {
      //     persona.value = { ...props.persona }
      //     // cancion.value = { ...props.cancion }
      //     // artista.value.id = cancion.value.album.artista.id
      //     // obtenerAlbumes()
      //   }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Persona'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="profesion" class="font-semibold w-3">Profesion</label>
        <Select
          id="profesion"
          v-model="persona.profesion.id"
          :options="profesiones"
          optionLabel="nombreCompleto"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="persona.nombreCompleto"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fotografia" class="font-semibold w-24">Fotografia</label>
        <InputText
          id="fotografia"
          v-model="persona.fotografia"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style> -->

<script setup lang="ts">
import type { Persona } from '@/models/persona'
import type { Profesiones } from '@/models/profesiones'
import http from '@/plugins/axios'
import { Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'personas'
const props = defineProps({
  mostrar: Boolean,
  persona: {
    type: Object as () => Persona,
    default: () => ({}) as Persona,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const profesiones = ref<Profesiones[]>([])
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const persona = ref<Persona>({} as Persona)
const idProfesionSeleccionada = ref<number | null>(null)

async function obtenerProfesiones() {
  profesiones.value = await http.get('profesiones').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idProfesion: idProfesionSeleccionada.value,
      nombreCompleto: persona.value.nombreCompleto,
      fotografia: persona.value.fotografia,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${persona.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    persona.value = {} as Persona
    idProfesionSeleccionada.value = null
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

// watch(
//   () => props.mostrar,
//   (nuevoValor) => {
//     if (nuevoValor) {
//       obtenerProfesiones()
//       if (props.persona.id) {
//         persona.value = { ...props.persona }
//         idProfesionSeleccionada.value = props.persona.idProfesion
//       } else {
//         persona.value = {} as Persona
//         idProfesionSeleccionada.value = null
//       }
//     }
//   },
// )
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerProfesiones().then(() => {
        if (props.persona && props.persona.id) {
          // Modo edición
          persona.value = { ...props.persona }
          idProfesionSeleccionada.value = props.persona.idProfesion
        } else {
          // Modo crear
          persona.value = {} as Persona
          idProfesionSeleccionada.value = null
        }
      })
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Persona'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="profesion" class="font-semibold w-3">Profesion</label>
        <Select
          id="profesion"
          v-model="idProfesionSeleccionada"
          :options="profesiones"
          optionLabel="nombreCompleto"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="persona.nombreCompleto"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fotografia" class="font-semibold w-24">Fotografia</label>
        <InputText
          id="fotografia"
          v-model="persona.fotografia"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
