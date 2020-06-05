defmodule Doa.Repo.Migrations.CreatePlants do
  use Ecto.Migration

  def change do
    create table(:plants) do
      add :accepted_symbol, :string
      add :synonym_symbol, :string
      add :scientific_name, :string
      add :common_name, :string
      add :plants_floristic_area, :string
      add :state_and_province, :text
      add :fact_sheets, :string
      add :plant_guides, :string
      add :characteristics_data, :string
      add :adapted_to_coarse_soil, :string
      add :adapted_to_medium_soil, :string
      add :adapted_to_fine_soil, :string
      add :anaerobic_tolerance, :string
      add :calcium_carbonate_tolerance, :string
      add :cold_stratification_required, :string
      add :drought_tolerance, :string
      add :fertility_requirement, :string
      add :min_frost_free_days, :integer
      add :hedge_tolerance, :string
      add :moisture_use, :string
      add :min_ph, :float
      add :max_ph, :float
      add :min_precipitation, :integer
      add :max_precipitation, :integer
      add :min_root_depth, :integer
      add :salinity_tolerance, :string
      add :shade_tolerance, :string
      add :min_temperature, :integer

      timestamps()
    end

  end
end
