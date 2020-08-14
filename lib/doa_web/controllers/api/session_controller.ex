defmodule DoaWeb.Api.SessionController do
  use DoaWeb, :api_controller
  alias Doa.Auth.Guardian

  #TODO
  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) when is_binary(email) and is_binary(pass) do
    IO.puts "123"
    case Doa.Auth.Authentication.authorize(conn, email, pass) do
      {:ok, conn} ->
          IO.puts "xyz"
          logged_in_user = Guardian.Plug.current_resource(conn)
          IO.puts "QYOWIER"
          ok(conn, logged_in_user)
      :error  ->
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
