defmodule DoaWeb.Api do
  use DoaWeb, :controller
  import DoaWeb.Api.Helpers

  def missing_route(conn, _) do
    error(conn, "unkown api route", :not_found)
  end
end
