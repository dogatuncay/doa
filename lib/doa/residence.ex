defmodule Doa.Residence do
  use Ecto.Schema
  alias Doa.Repo
  alias Doa.Residence
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  @optional_fields []
  @required_fields [:title, :zipcode]
  @fields @optional_fields ++ @required_fields

  @derive {Jason.Encoder, only: [:id, :title, :zipcode, :user_id]}
  schema "residences" do
    field :title,    :string, size: 40
    field :zipcode,    :string, size: 10
    belongs_to :user, Doa.User
    has_many :plant_instances, Doa.PlantInstance

    timestamps()
  end

  def update_changeset(residence \\ %__MODULE__{}, attrs \\ %{}) do
    residence
    |> cast(attrs, @fields)
    |> validate_length(:title, min: 1, max: 100)
    |> validate_format(:zipcode, ~r/^[0-9]{5}(?:-[0-9]{4})?$/, message: "Invalid zipcode")
  end

  def create_changeset(residence \\ %__MODULE__{}, attrs \\ %{}) do
    residence
    |> update_changeset(attrs)
    |> validate_required(@required_fields)
  end

  def delete_residence_w_plants(id) do
    query = from i in Doa.PlantInstance, where: i.residence_id == ^id
    Repo.delete_all(query)
    %Residence{id: id} |> Repo.delete
  end
end
