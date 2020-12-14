defmodule DoaWeb.Resolvers.Residence do
  alias Doa.Residence
  alias Doa.Repo
  import Ecto.Query

  def residences(_, _, %{context: context}) do
    if Map.has_key?(context, :current_user) do
      current_user = context[:current_user]
      residences = current_user |> Ecto.assoc(:residences) |> Repo.all()
      {:ok, residences}
    else
      {:error, "not authenticated"}
    end
  end
end
