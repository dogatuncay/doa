defmodule Doa.Main.Residence do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :zipcode, :user_id]}
  schema "residences" do
    field :title,    :string, size: 40
    field :zipcode,    :string, size: 10
    belongs_to :user, Doa.Main.User
    has_many :plant_instances, Doa.Main.PlantInstance

    timestamps()
  end
  @doc false
  def changeset(residence \\ %__MODULE__{}, attrs \\ %{}) do
    residence
    |> cast(attrs, [:title, :zipcode])
    |> validate_length(:title, min: 1, max: 100)
    |> validate_format(:zipcode, ~r/^[0-9]{5}(?:-[0-9]{4})?$/, message: "Invalid zipcode")
    |> validate_required([:title])
  end

  def delete_residence_w_plants(residence) do
    # query = from i in Doa.Main.PlantInstance, where: i.residence_id == ^residence.id
    # Doa.Repo.delete_all(query)
    Doa.Repo.delete(residence)
  end
end
