defmodule DoaWeb.Resolvers.Comment do
  import Ecto.Query

  alias Doa.Comment
  alias Doa.Repo

  def comments(_, _, _) do
    {:ok, Repo.all(Comment)}
  end

  def comment(_, filters, _) do
    filters = Keyword.new(filters)
    comment = Comment |> where(^filters) |> Repo.one!
    {:ok, comment}
  end
end
