defmodule DoaWeb.Resolvers.Story do
  alias Doa.Story
  alias Doa.Repo

  def story(_, %{id: id}, _) do
    {:ok, Repo.get(Story, id)}
  end

  def stories(_, _, _) do
    {:ok, Repo.all(Story)}
  end
end
