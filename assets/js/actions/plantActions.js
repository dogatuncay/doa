export const LOAD_PLANTS = 'LOAD_PLANTS'
export const LOAD_PLANTS_ALPHABETICALLY = 'LOAD_PLANTS_ALPHABETICALLY'
export const LOAD_PLANTS_SEARCH = 'LOAD_PLANTS_SEARCH'

export function loadPlants(plants) {
  return { type: LOAD_PLANTS, plants };
}

export function loadPlantsAlphabetically(plants, offset, count) {
  return { type: LOAD_PLANTS_ALPHABETICALLY, plants, offset, count };
}

export function loadPlantsSearch(plants, searchTerm, offset, count) {
  return { type: LOAD_PLANTS_SEARCH, plants, searchTerm, offset, count };
}
