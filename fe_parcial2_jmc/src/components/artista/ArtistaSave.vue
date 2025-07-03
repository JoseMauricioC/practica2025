<!-- <script setup lang="ts">
import type { Artista } from '@/models/artista'
import http from '@/plugins/axios'
import { InputNumber, InputText } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'artistas'
const props = defineProps({
  mostrar: Boolean,
  artista: {
    type: Object as () => Artista,
    default: () => ({}) as Artista,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const artista = ref<Artista>({ ...props.artista })
watch(
  () => props.artista,
  (newVal) => {
    artista.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: artista.value.nombre,
      fotografia: artista.value.fotografia,
      precioDisco: artista.value.precioDisco,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${artista.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    artista.value = {} as Artista
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Artista' : 'Crear Artista'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-24">Nombre</label>
        <InputText
          id="nombre"
          v-model="artista.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fotografia" class="font-semibold w-24">Fotografia</label>
        <InputText
          id="fotografia"
          v-model="artista.fotografia"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-24">Precio (Bs)</label>
        <InputNumber
          id="precio"
          v-model="artista.precioDisco"
          class="flex-auto"
          inputId="precio"
          :min="0"
          :step="0.01"
          mode="decimal"
          :useGrouping="false"
          showButtons
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
import type { Artista } from '@/models/artista'
import http from '@/plugins/axios'
import { InputNumber, InputText } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'artistas'
const props = defineProps({
  mostrar: Boolean,
  artista: {
    type: Object as () => Artista,
    default: () => ({}) as Artista,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const artista = ref<Artista>({ ...props.artista })
watch(
  () => props.artista,
  (newVal) => {
    artista.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: artista.value.nombre,
      fotografia: artista.value.fotografia,
      precioDisco: artista.value.precioDisco,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${artista.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    artista.value = {} as Artista
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="artist-dialog-wrapper">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Artista' : 'Crear Artista'"
      style="width: 28rem"
      modal
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      class="artist-form-dialog"
    >
      <div class="p-fluid form-content">
        <div class="p-field form-group">
          <label for="nombre" class="form-label">Nombre</label>
          <InputText
            id="nombre"
            v-model="artista.nombre"
            class="p-inputtext-lg"
            autocomplete="off"
            autofocus
          />
        </div>
        <div class="p-field form-group">
          <label for="fotografia" class="form-label">Fotografía URL</label>
          <InputText
            id="fotografia"
            v-model="artista.fotografia"
            class="p-inputtext-lg"
            autocomplete="off"
          />
        </div>

        <div class="p-field form-group">
          <label for="precio" class="form-label">Precio de Disco (Bs)</label>
          <InputNumber
            id="precio"
            v-model="artista.precioDisco"
            class="p-inputtext-lg"
            inputId="precio"
            :min="0"
            :step="0.01"
            mode="decimal"
            :useGrouping="false"
            showButtons
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer-buttons">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            @click="dialogVisible = false"
            class="p-button-outlined p-button-secondary"
          ></Button>
          <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
/* Wrapper for the dialog, mostly for visual context if needed */
.artist-dialog-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; If this component is the main view for the dialog */
  /* background-color: var(--surface-ground, #f8f9fa); */
}

/* Styling for the dialog header and content */
.artist-form-dialog .p-dialog-header {
  background-color: var(--primary-color, #1e88e5); /* Use primary color for header */
  color: var(--primary-color-text, #ffffff); /* White text on primary background */
  padding: 1.25rem 1.5rem;
  border-top-left-radius: var(--border-radius, 6px);
  border-top-right-radius: var(--border-radius, 6px);
}

.artist-form-dialog .p-dialog-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.artist-form-dialog .p-dialog-header-icon {
  color: var(--primary-color-text, #ffffff); /* White icon for close button */
}

.form-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Space between form groups */
}

.form-group {
  display: flex;
  flex-direction: column; /* Stack label and input vertically */
  gap: 0.5rem; /* Space between label and input */
}

.form-label {
  font-weight: 600;
  color: var(--text-color, #495057);
  font-size: 0.95rem;
  margin-bottom: 0.25rem; /* Small space below label */
}

/* Styling for PrimeVue InputText and InputNumber */
/* p-inputtext-lg will make them slightly larger, but can also add custom styles */
.p-inputtext-lg {
  padding: 0.75rem 1rem; /* Slightly more padding */
  font-size: 1rem;
  border-radius: var(--border-radius, 6px);
  border: 1px solid var(--surface-border, #ced4da);
  box-shadow: none; /* Remove default PrimeVue shadow if desired */
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.p-inputtext-lg:focus {
  border-color: var(--primary-color, #1e88e5);
  box-shadow: 0 0 0 0.2rem var(--primary-50, rgba(30, 136, 229, 0.25)); /* Focus ring */
  outline: none;
}

/* Specific adjustments for InputNumber buttons */
.p-inputnumber-buttons .p-button {
  width: 2rem; /* Make buttons less wide */
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Styling for the dialog footer */
.dialog-footer-buttons {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 0.75rem; /* Space between buttons */
  padding: 1rem 1.5rem;
  background-color: var(--surface-footer, #f8f9fa); /* Light background for footer */
  border-bottom-left-radius: var(--border-radius, 6px);
  border-bottom-right-radius: var(--border-radius, 6px);
  border-top: 1px solid var(--surface-border, #e9ecef);
}

/* Specific button styles */
.p-button-outlined.p-button-secondary {
  color: var(--text-color-secondary, #6c757d);
  border-color: var(--surface-border, #6c757d);
  background-color: transparent;
}

.p-button-outlined.p-button-secondary:hover {
  background-color: var(--surface-hover, #e9ecef);
  color: var(--text-color-secondary, #6c757d);
}

/* General button styles for save button */
.p-button {
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius, 6px);
}
</style>
