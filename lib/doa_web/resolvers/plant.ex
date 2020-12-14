defmodule DoaWeb.Resolvers.Plant do
  import Ecto.Query

  alias Doa.Plant
  alias Doa.Repo

  def plants(_, _, _) do
    {:ok, Repo.all(Plant)}
  end

  def plant(_, filters, _) do
    filters = Keyword.new(filters)
    plant = Plant |> where(^filters) |> Repo.one!
    {:ok, plant}
  end
end
