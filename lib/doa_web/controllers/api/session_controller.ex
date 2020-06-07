defmodule DoaWeb.SessionController do
  use DoaWeb, :controller
  plug :put_view, DoaWeb.ApiView

  def create(conn, %{"session" => %{"email" => email, "password" => pass}}) do
      case Doa.Auth.login_by_email_and_pass(conn, email, pass, repo: Doa.Repo) do
        {:ok, conn} ->
            logged_in_user = Guardian.Plug.current_resource(conn)
            render(conn, "ok.json", %{result: logged_in_user})
        {:error, _reason, conn} ->
          render(conn, "error.json", %{message: "Wrong username/password"})
      end
  end

  def delete(conn, _) do
    conn
    |> Guardian.Plug.sign_out
    |> render( "ok.json")
  end
end
