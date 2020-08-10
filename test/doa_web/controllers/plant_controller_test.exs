defmodule DoaWeb.PlantControllerTest do
  use DoaWeb.ConnCase
  alias Doa.Main

  @create_attrs %{
    accepted_symbol: "some accepted_symbol",
    adapted_to_coarse_soil: "some adapted_to_coarse_soil",
    adapted_to_fine_soil: "some adapted_to_fine_soil",
    adapted_to_medium_soil: "some adapted_to_medium_soil",
    anaerobic_tolerance: "some anaerobic_tolerance",
    calcium_carbonate_tolerance: "some calcium_carbonate_tolerance",
    characteristics_data: "some characteristics_data",
    common_name: "some common_name",
    fact_sheets: "some fact_sheets",
    plant_guides: "some plant_guides",
    plants_floristic_area: "some plants_floristic_area",
    scientific_name: "some scientific_name",
    state_and_province: "some state_and_province",
    synonym_symbol: "some synonym_symbol",
    cold_stratification_required: "some cold_stratification_required",
    drought_tolerance: "some drought_tolerance",
    fertility_requirement: "some fertility_requirement",
    min_frost_free_days: 0,
    hedge_tolerance: "some hedge_tolerance",
    moisture_use: "some moisture_use",
    min_ph: 0.0,
    max_ph: 0.0,
    min_precipitation: 0,
    max_precipitation: 0,
    min_root_depth: 0,
    salinity_tolerance: "some salinity_tolerance",
    shade_tolerance: "some share_tolerance",
    min_temperature: 0
  }

  describe "index" do
    test "lists all plants", %{conn: conn} do
      conn = get(conn, Routes.plant_path(conn, :index, limit: 10, offset: 0))
      assert json_response(conn, 200)["ok"]
      assert json_response(conn, 200)["result"]["num_entries"] == 0
      assert json_response(conn, 200)["result"]["plants"] == []

      changeset = Doa.Main.Plant.changeset(%Doa.Main.Plant{}, @create_attrs)
      Doa.Repo.insert!(changeset)
      conn = get(conn, Routes.plant_path(conn, :index, limit: 10, offset: 0))
      assert json_response(conn, 200)["result"]["num_entries"] == 1
    end
  end

  describe "search" do
    test "search a plant", %{conn: conn} do
      changeset = Doa.Main.Plant.changeset(%Doa.Main.Plant{}, @create_attrs)
      Doa.Repo.insert!(changeset)
      conn = post(conn, Routes.plant_path(conn, :search), filter: "some", limit: 10, offset: 0)
      assert json_response(conn, 200)["result"]["num_entries"] == 1
      conn = post(conn, Routes.plant_path(conn, :search), filter: "none", limit: 10, offset: 0)
      assert json_response(conn, 200)["result"]["num_entries"] == 0
    end
  end

  describe "get" do
    test "search a plant", %{conn: conn} do
      changeset = Doa.Main.Plant.changeset(%Doa.Main.Plant{}, @create_attrs)
      {:ok, plant} = Doa.Repo.insert(changeset)
      conn = get(conn, Routes.plant_path(conn, :get, plant.id))
      assert json_response(conn, 200)
    end
  end
end
