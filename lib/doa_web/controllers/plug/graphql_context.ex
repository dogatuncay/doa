defmodule DoaWeb.Plug.GraphQLContext do
  import Plug.Conn

  def init(_), do: %{}

  def call(conn, _) do
    if Map.has_key?(conn.private, :guardian_default_resource) do
      context = %{current_user: conn.private[:guardian_default_resource]}
      put_private(conn, :absinthe, %{context: context})
    else
      conn
    end
  end
end
