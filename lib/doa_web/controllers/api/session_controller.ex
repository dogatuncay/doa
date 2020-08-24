defmodule DoaWeb.Api.SessionController do
  use DoaWeb, :api_controller
  alias Doa.Auth.Guardian

  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) when is_binary(email) and is_binary(pass) do
    case Doa.Auth.Authentication.authorize(conn, email, pass) do
      {:ok, conn} ->
          logged_in_user = Guardian.Plug.current_resource(conn)
          ok(conn, logged_in_user)
      :error  ->
        error(conn, "Wrong username/password")
    end
  end

  def index(conn, _) do
    logged_in_user = Guardian.Plug.current_resource(conn)
    ok(conn, logged_in_user)
  end

  def delete(conn, _) do
    conn
    |> Guardian.Plug.sign_out
    |> ok()
  end
end
