defmodule DoaWeb.Api.UserController do
  use DoaWeb, :controller
  alias Doa.Main.User
  alias Doa.Repo
  require IEx
  # import Ecto.Query, only: [from: 2]

  plug :put_view, DoaWeb.ApiView

  def new(conn, %{"user" => params}) do
    changeset = User.registration_changeset(%User{}, params)
    case Repo.insert(changeset) do
      {:ok, created_user} ->
        Doa.Auth.login(conn, created_user)
        |> render("ok.json", result: created_user)
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end
end
