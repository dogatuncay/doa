defmodule DoaWeb.Resolvers.User do
  alias Doa.User
  alias Doa.Repo

  def current_user(_, _, %{context: context}) do
    if Map.has_key?(context, :current_user) do
      {:ok, context[:current_user]}
    else
      {:error, "not authenticated"}
    end
  end

  def users(_, _, _) do
    {:ok, Repo.all(User)}
  end
end
