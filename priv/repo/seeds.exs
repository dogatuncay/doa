# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Doa.Repo.insert!(%Doa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Doa.Repo
alias Doa.Main.Plant
alias Doa.Main.State

defmodule Doa.Seeds do

  def string_to_int(value) do
    if value != "" do
      {n, _} = Integer.parse(value)
      n
    else
      nil
    end
  end

  def convert_integer_fields(row, fields) do
    Enum.reduce(fields, row, fn field, row ->
      Map.update!(row, field, &string_to_int/1)
    end)
  end

  def string_to_float(value) do
    if value != "", do: String.to_float(value), else: nil
  end

  def convert_float_fields(row, fields) do
    Enum.reduce(fields, row, fn field, row ->

      Map.update!(row, field, &string_to_float/1)
    end)
  end

  def store_plants(row) do
    params =
      row
      |> convert_integer_fields([:min_frost_free_days, :min_precipitation, :max_precipitation, :min_root_depth, :min_temperature])
      |> convert_float_fields([:min_ph, :max_ph])
    changeset = Plant.changeset(%Plant{}, params)
    Repo.insert!(changeset)
  end

  def store_states(row) do
    changeset = State.changeset(%State{}, row)
    Repo.insert!(changeset)
  end
end

File.stream!("/Users/dogatuncay/Documents/elixir/doa/priv/repo/data/plants.csv")
  |> Stream.drop(1)
  |> CSV.decode(headers:
    [:accepted_symbol,
    :synonym_symbol,
    :scientific_name,
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
    :min_temperature])
  |> Enum.each(&Doa.Seeds.store_plants/1)

File.stream!("/Users/dogatuncay/Documents/elixir/doa/priv/repo/data/states.csv")
  |> Stream.drop(1)
  |> CSV.decode(headers: [:state, :stateAbbreviation])
  |> Enum.each(&Doa.Seeds.store_states/1)
