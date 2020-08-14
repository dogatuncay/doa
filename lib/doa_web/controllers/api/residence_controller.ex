# TODO: same as story
defmodule DoaWeb.Api.ResidenceController do
  use DoaWeb, :api_controller
  alias Doa.Residence
  alias Doa.Repo

  def index(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    residences = Repo.all(Ecto.assoc(user, :residences))
    ok(conn, %{residences: residences})
  end
  def create(conn, %{"residence" => params}) do
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:residences)
      |> Residence.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_residence} ->
        ok(conn, created_residence)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  def update(conn, %{"id" => id, "residence" => params}) do
    case Repo.update(%Residence{id: String.to_integer(id)} |> Residence.update_changeset(params)) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    case Residence.delete_residence_w_plants(id) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

end
