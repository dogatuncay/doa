defmodule DoaWeb.Api.Helpers do
  import Plug.Conn, only: [put_status: 2]
  import Phoenix.Controller, only: [render: 3]

  @spec ok(Plug.Conn.t()) :: Plug.Conn.t()
  def ok(conn) do
    render(conn, "ok.json", [])
  end

  @spec ok(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def ok(conn, result) do
    render(conn, "ok.json", result: result)
  end

  @spec error(Plug.Conn.t(), String.t(), Plug.Conn.status()) :: Plug.Conn.t()
  def error(conn, message, status \\ :bad_request) do
    conn
    |> put_status(status)
    |> render("error.json", message: message)
  end

  ##TODO
  @spec changeset_errors(Plug.Conn.t(), any(), Plug.Conn.status()) :: Plug.Conn.t()
  def changeset_errors(conn, errors, status \\ :bad_request) do
    conn
    |> put_status(status)
    |> render("changeset_errors.json", errors: errors)
  end
end
