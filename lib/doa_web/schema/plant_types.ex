defmodule DoaWeb.Schema.PlantTypes do
  use Absinthe.Schema.Notation

  object :plant do
    field :id, non_null(:id)
    field :accepted_symbol, non_null(:string)
    field :synonym_symbol, :string
    field :scientific_name, :string
    field :common_name, :string
    field :plants_floristic_area, :string
    field :state_and_province, :string
    field :fact_sheets, :string
    field :plant_guides, :string
    field :characteristics_data, :string
    field :adapted_to_coarse_soil, :string
    field :adapted_to_medium_soil, :string
    field :adapted_to_fine_soil, :string
    field :anaerobic_tolerance, :string
    field :calcium_carbonate_tolerance, :string
    field :cold_stratification_required, :string
    field :drought_tolerance, :string
    field :fertility_requirement, :string
    field :min_frost_free_days, :integer
    field :hedge_tolerance, :string
    field :moisture_use, :string
    field :min_ph, :float
    field :max_ph, :float
    field :min_precipitation, :integer
    field :max_precipitation, :integer
    field :min_root_depth, :integer
    field :salinity_tolerance, :string
    field :shade_tolerance, :string
    field :min_temperature, :integer
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime
  end
end
