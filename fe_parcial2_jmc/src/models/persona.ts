import type { Profesiones } from './profesiones'

export interface Persona {
  id: number
  idProfesion: number
  nombreCompleto: string
  fotografia: string
  profesion: Profesiones
}
