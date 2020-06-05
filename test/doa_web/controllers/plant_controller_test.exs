defmodule DoaWeb.PlantControllerTest do
  use DoaWeb.ConnCase

  alias Doa.Main

  @create_attrs %{" ": "some  ", accepted_symbol: "some accepted_symbol", adapted_to_coarse_soil: "some adapted_to_coarse_soil", adapted_to_fine_soil: "some adapted_to_fine_soil", adapted_to_medium_soil: "some adapted_to_medium_soil", anaerobic_tolerance: "some anaerobic_tolerance", calcium_carbonate_tolerance: "some calcium_carbonate_tolerance", characteristics_data: "some characteristics_data", common_name: "some common_name", fact_sheets: "some fact_sheets", plant_guides: "some plant_guides", plants_floristic_area: "some plants_floristic_area", scientific_name: "some scientific_name", state_and_province: "some state_and_province", synonym_symbol: "some synonym_symbol"}
  @update_attrs %{" ": "some updated  ", accepted_symbol: "some updated accepted_symbol", adapted_to_coarse_soil: "some updated adapted_to_coarse_soil", adapted_to_fine_soil: "some updated adapted_to_fine_soil", adapted_to_medium_soil: "some updated adapted_to_medium_soil", anaerobic_tolerance: "some updated anaerobic_tolerance", calcium_carbonate_tolerance: "some updated calcium_carbonate_tolerance", characteristics_data: "some updated characteristics_data", common_name: "some updated common_name", fact_sheets: "some updated fact_sheets", plant_guides: "some updated plant_guides", plants_floristic_area: "some updated plants_floristic_area", scientific_name: "some updated scientific_name", state_and_province: "some updated state_and_province", synonym_symbol: "some updated synonym_symbol"}
  @invalid_attrs %{" ": nil, accepted_symbol: nil, adapted_to_coarse_soil: nil, adapted_to_fine_soil: nil, adapted_to_medium_soil: nil, anaerobic_tolerance: nil, calcium_carbonate_tolerance: nil, characteristics_data: nil, common_name: nil, fact_sheets: nil, plant_guides: nil, plants_floristic_area: nil, scientific_name: nil, state_and_province: nil, synonym_symbol: nil}

  def fixture(:plant) do
    {:ok, plant} = Main.create_plant(@create_attrs)
    plant
  end

  describe "index" do
    test "lists all plants", %{conn: conn} do
      conn = get(conn, Routes.plant_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Plants"
    end
  end

  describe "new plant" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.plant_path(conn, :new))
      assert html_response(conn, 200) =~ "New Plant"
    end
  end

  describe "create plant" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.plant_path(conn, :create), plant: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.plant_path(conn, :show, id)

      conn = get(conn, Routes.plant_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Plant"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.plant_path(conn, :create), plant: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Plant"
    end
  end

  describe "edit plant" do
    setup [:create_plant]

    test "renders form for editing chosen plant", %{conn: conn, plant: plant} do
      conn = get(conn, Routes.plant_path(conn, :edit, plant))
      assert html_response(conn, 200) =~ "Edit Plant"
    end
  end

  describe "update plant" do
    setup [:create_plant]

    test "redirects when data is valid", %{conn: conn, plant: plant} do
      conn = put(conn, Routes.plant_path(conn, :update, plant), plant: @update_attrs)
      assert redirected_to(conn) == Routes.plant_path(conn, :show, plant)

      conn = get(conn, Routes.plant_path(conn, :show, plant))
      assert html_response(conn, 200) =~ "some updated  "
    end

    test "renders errors when data is invalid", %{conn: conn, plant: plant} do
      conn = put(conn, Routes.plant_path(conn, :update, plant), plant: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Plant"
    end
  end

  describe "delete plant" do
    setup [:create_plant]

    test "deletes chosen plant", %{conn: conn, plant: plant} do
      conn = delete(conn, Routes.plant_path(conn, :delete, plant))
      assert redirected_to(conn) == Routes.plant_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.plant_path(conn, :show, plant))
      end
    end
  end

  defp create_plant(_) do
    plant = fixture(:plant)
    {:ok, plant: plant}
  end
end
