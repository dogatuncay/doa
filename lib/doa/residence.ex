defmodule Doa.Residence do
  use Ecto.Schema
  alias Doa.Repo
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  @derive {Jason.Encoder, only: [:id, :title, :zipcode, :user_id]}
  schema "residences" do
    field :title,    :string, size: 40
    field :zipcode,    :string, size: 10
    belongs_to :user, Doa.User
    has_many :plant_instances, Doa.PlantInstance

    timestamps()
  end
  @doc false
  def changeset(residence \\ %__MODULE__{}, attrs \\ %{}) do
    residence
    |> cast(attrs, [:title, :zipcode])
    |> validate_length(:title, min: 1, max: 100)
    |> validate_format(:zipcode, ~r/^[0-9]{5}(?:-[0-9]{4})?$/, message: "Invalid zipcode")
    |> validate_required([:title, :zipcode])
  end

  def delete_residence_w_plants(residence) do
    query = from i in Doa.PlantInstance, where: i.residence_id == ^residence.id
    Repo.delete_all(query)
    Repo.delete(residence)
  end
end
