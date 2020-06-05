defmodule Doa.MainTest do
  use Doa.DataCase

  alias Doa.Main

  describe "plants" do
    alias Doa.Main.Plant

    @valid_attrs %{" ": "some  ", accepted_symbol: "some accepted_symbol", adapted_to_coarse_soil: "some adapted_to_coarse_soil", adapted_to_fine_soil: "some adapted_to_fine_soil", adapted_to_medium_soil: "some adapted_to_medium_soil", anaerobic_tolerance: "some anaerobic_tolerance", calcium_carbonate_tolerance: "some calcium_carbonate_tolerance", characteristics_data: "some characteristics_data", common_name: "some common_name", fact_sheets: "some fact_sheets", plant_guides: "some plant_guides", plants_floristic_area: "some plants_floristic_area", scientific_name: "some scientific_name", state_and_province: "some state_and_province", synonym_symbol: "some synonym_symbol"}
    @update_attrs %{" ": "some updated  ", accepted_symbol: "some updated accepted_symbol", adapted_to_coarse_soil: "some updated adapted_to_coarse_soil", adapted_to_fine_soil: "some updated adapted_to_fine_soil", adapted_to_medium_soil: "some updated adapted_to_medium_soil", anaerobic_tolerance: "some updated anaerobic_tolerance", calcium_carbonate_tolerance: "some updated calcium_carbonate_tolerance", characteristics_data: "some updated characteristics_data", common_name: "some updated common_name", fact_sheets: "some updated fact_sheets", plant_guides: "some updated plant_guides", plants_floristic_area: "some updated plants_floristic_area", scientific_name: "some updated scientific_name", state_and_province: "some updated state_and_province", synonym_symbol: "some updated synonym_symbol"}
    @invalid_attrs %{" ": nil, accepted_symbol: nil, adapted_to_coarse_soil: nil, adapted_to_fine_soil: nil, adapted_to_medium_soil: nil, anaerobic_tolerance: nil, calcium_carbonate_tolerance: nil, characteristics_data: nil, common_name: nil, fact_sheets: nil, plant_guides: nil, plants_floristic_area: nil, scientific_name: nil, state_and_province: nil, synonym_symbol: nil}

    def plant_fixture(attrs \\ %{}) do
      {:ok, plant} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Main.create_plant()

      plant
    end

    test "list_plants/0 returns all plants" do
      plant = plant_fixture()
      assert Main.list_plants() == [plant]
    end

    test "get_plant!/1 returns the plant with given id" do
      plant = plant_fixture()
      assert Main.get_plant!(plant.id) == plant
    end

    test "create_plant/1 with valid data creates a plant" do
      assert {:ok, %Plant{} = plant} = Main.create_plant(@valid_attrs)
      assert plant.  == "some  "
      assert plant.accepted_symbol == "some accepted_symbol"
      assert plant.adapted_to_coarse_soil == "some adapted_to_coarse_soil"
      assert plant.adapted_to_fine_soil == "some adapted_to_fine_soil"
      assert plant.adapted_to_medium_soil == "some adapted_to_medium_soil"
      assert plant.anaerobic_tolerance == "some anaerobic_tolerance"
      assert plant.calcium_carbonate_tolerance == "some calcium_carbonate_tolerance"
      assert plant.characteristics_data == "some characteristics_data"
      assert plant.common_name == "some common_name"
      assert plant.fact_sheets == "some fact_sheets"
      assert plant.plant_guides == "some plant_guides"
      assert plant.plants_floristic_area == "some plants_floristic_area"
      assert plant.scientific_name == "some scientific_name"
      assert plant.state_and_province == "some state_and_province"
      assert plant.synonym_symbol == "some synonym_symbol"
    end

    test "create_plant/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Main.create_plant(@invalid_attrs)
    end

    test "update_plant/2 with valid data updates the plant" do
      plant = plant_fixture()
      assert {:ok, %Plant{} = plant} = Main.update_plant(plant, @update_attrs)
      assert plant.  == "some updated  "
      assert plant.accepted_symbol == "some updated accepted_symbol"
      assert plant.adapted_to_coarse_soil == "some updated adapted_to_coarse_soil"
      assert plant.adapted_to_fine_soil == "some updated adapted_to_fine_soil"
      assert plant.adapted_to_medium_soil == "some updated adapted_to_medium_soil"
      assert plant.anaerobic_tolerance == "some updated anaerobic_tolerance"
      assert plant.calcium_carbonate_tolerance == "some updated calcium_carbonate_tolerance"
      assert plant.characteristics_data == "some updated characteristics_data"
      assert plant.common_name == "some updated common_name"
      assert plant.fact_sheets == "some updated fact_sheets"
      assert plant.plant_guides == "some updated plant_guides"
      assert plant.plants_floristic_area == "some updated plants_floristic_area"
      assert plant.scientific_name == "some updated scientific_name"
      assert plant.state_and_province == "some updated state_and_province"
      assert plant.synonym_symbol == "some updated synonym_symbol"
    end

    test "update_plant/2 with invalid data returns error changeset" do
      plant = plant_fixture()
      assert {:error, %Ecto.Changeset{}} = Main.update_plant(plant, @invalid_attrs)
      assert plant == Main.get_plant!(plant.id)
    end

    test "delete_plant/1 deletes the plant" do
      plant = plant_fixture()
      assert {:ok, %Plant{}} = Main.delete_plant(plant)
      assert_raise Ecto.NoResultsError, fn -> Main.get_plant!(plant.id) end
    end

    test "change_plant/1 returns a plant changeset" do
      plant = plant_fixture()
      assert %Ecto.Changeset{} = Main.change_plant(plant)
    end
  end
end
