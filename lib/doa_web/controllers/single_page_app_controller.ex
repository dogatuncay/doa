defmodule DoaWeb.SinglePageAppController do
  use DoaWeb, :controller

  def show_application(conn, _params) do
    render(conn, "app.html")
  end
end
