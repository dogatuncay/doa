defmodule DoaWeb.Schema.ResidenceTypes do
  use Absinthe.Schema.Notation
  alias Doa.Repo
  import Ecto.Query

  object :residence do
    field :id, non_null(:integer)
    field :title, non_null(:string)
    field :zipcode, non_null(:string)
    field :user_id, non_null(:integer)

    field :plant_instances, list_of(:plant_instance) do
      resolve fn residence, _, _ ->
        plant_instances = residence |> Ecto.assoc(:plant_instances) |> Repo.all()
        {:ok, plant_instances}
      end
    end
  end
end
