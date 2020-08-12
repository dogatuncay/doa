defmodule DoaWeb.Api.PlantInstanceController do
  use DoaWeb, :api_controller
  alias Doa.PlantInstance
  alias Doa.Residence

  # TODO: put in a helper or something, cause you have multiple of these
  defp parse_int(n) when is_integer(n), do: n
  defp parse_int(s) when is_binary(s), do: String.to_integer(s)

  @allowed_preloads ["plant"]

  # TODO: refactor dynamic preloading
  def get_by_residence(conn, params = %{"residence_id" => residence_id}) do
    preload_input = Map.get(params, "preload", [])
    preloads = if is_list(preload_input), do: preload_input, else: [preload_input]
    filtered_preloads =
      Enum.filter(preloads, &Enum.member?(@allowed_preloads, &1))
      |> Enum.map(&String.to_atom/1)
    residence = Repo.get!(Residence, residence_id)
    query =
      Ecto.assoc(residence, :plant_instances)
      |> Ecto.Query.preload(^filtered_preloads)
    plant_instances = Repo.all(query)
    ok(conn, %{plant_instances: plant_instances})
  end

  def new(conn, %{"residence_id" => residence_id, "plant_instance" => plant_instance_params}) do
    params = Map.put(plant_instance_params, "residence_id", residence_id)
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:plant_instances)
      |> PlantInstance.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_plant_instance} ->
        ok(conn, created_plant_instance)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  def update(conn, %{"residence_id" => _, "plant_instance_id" => plant_instance_id, "plant_instance" => params}) do
    plant_instance = Repo.get!(PlantInstance, plant_instance_id)
    case PlantInstance.changeset(plant_instance, params) |> Repo.update do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"residence_id" => _, "plant_instance_id" => plant_instance_id}) do
    plant_instance = Repo.get!(PlantInstance, plant_instance_id)
    case Repo.delete(plant_instance) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

end
