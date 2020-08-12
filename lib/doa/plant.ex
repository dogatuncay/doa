defmodule Doa.Plant do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @required_fields [
    :accepted_symbol,
    :scientific_name
  ]

  @editable_fields @required_fields ++ [
    :synonym_symbol,
    :common_name,
    :plants_floristic_area,
    :state_and_province,
    :fact_sheets,
    :plant_guides,
    :characteristics_data,
    :adapted_to_coarse_soil,
    :adapted_to_medium_soil,
    :adapted_to_fine_soil,
    :anaerobic_tolerance,
    :calcium_carbonate_tolerance,
    :cold_stratification_required,
    :drought_tolerance,
    :fertility_requirement,
    :min_frost_free_days,
    :hedge_tolerance,
    :moisture_use,
    :min_ph,
    :max_ph,
    :min_precipitation,
    :max_precipitation,
    :min_root_depth,
    :salinity_tolerance,
    :shade_tolerance,
    :min_temperature
  ]

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "plants" do
    field :accepted_symbol, :string
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

    timestamps()
  end

  def get_search_query(filter, query \\ __MODULE__) do
    escaped_filter = Regex.replace(~r/([\%_])/, filter,  "\\\\\\1", global: true)
    pattern = "%#{escaped_filter}%"
    from p in query, where: ilike(p.common_name, ^pattern) or ilike(p.scientific_name, ^pattern)
  end
end
