defmodule DoaWeb.Api.PlantInstanceController do
  use DoaWeb, :api_controller
  alias Doa.PlantInstance
  alias Doa.Residence

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

  def create(conn, %{"residence_id" => residence_id, "plant_instance" => plant_instance_params}) do
    params = Map.put(plant_instance_params, "residence_id", residence_id)
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:plant_instances)
      |> PlantInstance.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_plant_instance} ->
        ok(conn, created_plant_instance)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  def update(conn, %{"residence_id" => _, "plant_instance_id" => plant_instance_id, "plant_instance" => params}) do
    case Repo.update(%PlantInstance{id: String.to_integer(plant_instance_id)} |> PlantInstance.update_changeset(params)) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"residence_id" => _, "plant_instance_id" => plant_instance_id}) do
    case %PlantInstance{id: plant_instance_id} |> Repo.delete do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

end
