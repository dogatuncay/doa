defmodule Doa.PlantInstance do
  use Ecto.Schema
  import Ecto.Changeset

  @optional_fields [:note, :is_indoor, :is_containerized, :light_requirement, ]
  @required_fields [:user_id, :residence_id, :plant_id]
  @fields @optional_fields ++ @required_fields

  schema "plant_instances" do
    field :note, :string
    field :is_indoor, :boolean
    field :is_containerized, :boolean
    field :light_requirement, Doa.Enum.LightRequirementsEnum

    belongs_to :user, Doa.User
    belongs_to :residence, Doa.Residence
    belongs_to :plant, Doa.Plant

    timestamps()
  end

  defimpl Jason.Encoder, for: __MODULE__ do
    @json_fields [:id, :note, :is_indoor, :is_containerized, :light_requirement, :user_id, :residence_id, :plant_id, :plant]
    def encode(struct, opts) do
      Enum.filter(Map.from_struct(struct), fn
        {_, %Ecto.Association.NotLoaded{}} -> false
        {k, _} -> Enum.member?(@json_fields, k)
      end)
      |> Map.new()
      |> Jason.Encode.map(opts)

      # filtered_map =
      #   Enum.reduce(Map.from_struct(struct), %{}, fn
      #     ({_, %Ecto.Association.NotLoaded{}}, acc) -> acc
      #     ({k, v}, acc) -> if Enum.member?(@json_fields, k), do: Map.put(acc, k, v), else: acc
      #   end)
      # Jason.Encode.map(filtered_map, opts)
    end
  end

  def create_changeset(plant_instance \\ %__MODULE__{}, attrs \\ %{}) do
    plant_instance
    |> update_changeset(attrs)
    |> validate_required([:plant_id, :residence_id, :user_id])
  end

  def update_changeset(plant_instance \\ %__MODULE__{}, attrs \\ %{}) do
    plant_instance
    |> cast(attrs, @fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:residence)
  end
end
