defmodule DoaWeb.Schema.PlantInstanceTypes do
  use Absinthe.Schema.Notation
  alias Doa.Repo
  import Ecto.Query

  object :plant_instance do
    field :id, non_null(:integer)
    field :note, :string
    field :is_indoor, :boolean
    field :is_containerized, :boolean
    # field :light_requirement, Doa.Enum.LightRequirementsEnum

    field :plant, :plant do
      resolve fn plant_instance, _, _ ->
        if plant_instance[:plant_id] != nil do
          plant = Repo.get(Plant, plant_instance[:plant_id])
          {:ok, plant}
        else
          {:ok, nil}
        end
      end
    end
  end
end
