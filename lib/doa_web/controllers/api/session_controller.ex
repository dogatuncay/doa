defmodule DoaWeb.Api.SessionController do
  use DoaWeb, :api_controller

  #TODO
  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) when is_binary(email) and is_binary(pass) do
    case Doa.Auth.authorize(conn, email, pass) do
      {:ok, conn} ->
          logged_in_user = Guardian.Plug.current_resource(conn)
          ok(conn, logged_in_user)
      {:error, conn} ->
        error(conn, "Wrong username/password")
    end
  end

  def show(conn, _) do
    logged_in_user = Guardian.Plug.current_resource(conn)
    ok(conn, logged_in_user)
  end

  def delete(conn, _) do
    conn
    |> Guardian.Plug.sign_out
    |> ok()
  end
end
