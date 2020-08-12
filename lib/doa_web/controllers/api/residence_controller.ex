# TODO: same as story
defmodule DoaWeb.Api.ResidenceController do
  use DoaWeb, :api_controller
  alias Doa.Residence
  alias Doa.Repo

  def get(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    residences = Repo.all(Ecto.assoc(user, :residences))
    ok(conn, %{residences: residences})
  end
  def new(conn, %{"residence" => params}) do
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:residences)
      |> Residence.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_residence} ->
        ok(conn, created_residence)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  def update(conn, %{"id" => id, "residence" => params}) do
    residence = Repo.get!(Residence, id)
    case Residence.changeset(residence, params) |> Repo.update do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    residence = Repo.get!(Residence, id)
    case Residence.delete_residence_w_plants(residence) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

end
