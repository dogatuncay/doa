defmodule DoaWeb.Api.ResidenceController do
  use DoaWeb, :controller
  alias Doa.Main.Residence
  alias Doa.Repo

  plug :put_view, DoaWeb.ApiView

  def get(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    residences = Repo.all(Ecto.assoc(user, :residences))
    render(conn, "ok.json", %{result: %{residences: residences}})
  end
  def new(conn, %{"residence" => params}) do
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:residences)
      |> Residence.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_residence} ->
        render(conn, "ok.json", result: created_residence)
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

  def update(conn, %{"id" => id, "residence" => params}) do
    residence = Repo.get!(Residence, id)
    case Residence.changeset(residence, params) |> Repo.update do
      {:ok, _} ->
        render(conn, "ok.json")
      {:error, changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    residence = Repo.get!(Residence, id)
    case Residence.delete_residence_w_plants(residence) do
      {:ok, _} ->
        render(conn, "ok.json")
      {:error, changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

end
