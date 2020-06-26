export const LOAD_RESIDENCES = 'LOAD_RESIDENCES'
export const RELOAD_RESIDENCE = 'RELOAD_RESIDENCE'
export const REMOVE_RESIDENCE = 'REMOVE_RESIDENCE'

export function loadResidences(residenceData) {
  return { type: LOAD_RESIDENCES, residenceData }
}

export function reloadResidence(newResidenceData) {
  return { type: RELOAD_RESIDENCE, newResidenceData }
}

export function removeResidence(id) {
  return { type: REMOVE_RESIDENCE, id}
}
