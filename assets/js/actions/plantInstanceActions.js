export const LOAD_PLANT_INSTANCES = 'LOAD_PLANT_INSTANCES'
export const RELOAD_PLANT_INSTANCE = 'RELOAD_PLANT_INSTANCE'
export const REMOVE_PLANT_INSTANCE = 'REMOVE_PLANT_INSTANCE'

export function loadPlantInstances(plantInstances) {
  return { type: LOAD_PLANT_INSTANCES, plantInstances };
}

export function reloadPlantInstance(newPlantInstanceData) {
  return { type: RELOAD_PLANT_INSTANCE, newPlantInstanceData }
}

export function removePlantInstance(id) {
  return { type: REMOVE_PLANT_INSTANCE, id}
}
