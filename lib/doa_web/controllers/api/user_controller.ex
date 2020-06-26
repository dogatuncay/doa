defmodule DoaWeb.Api.UserController do
  import Comeonin.Bcrypt, only: [checkpw: 2]
  use DoaWeb, :controller
  alias Doa.Main.User
  alias Doa.Repo
  require IEx
  import Ecto.Changeset
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

  def change_password(conn, %{"user" => params}) do
    logged_in_user = Guardian.Plug.current_resource(conn)
    if checkpw(Map.get(params, "current_password"), logged_in_user.password_hash) do
        password = Map.get(params, "password")
        changeset = User.password_changeset(logged_in_user, %{password: password})
        case Repo.update(changeset) do
          {:ok, _} ->
            render(conn, "ok.json")
          {:error, changeset} ->
            conn
            |> render("changeset_errors.json", errors: changeset.errors)
        end
      else
        changeset =
          change(%User{})
          |> add_error(:current_password, "incorrect password")
        render(conn, "changeset_errors.json", errors: changeset.errors)
    end
  end
end
