defmodule Doa.Main.Story do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :body, :user_id]}
  schema "stories" do
    field :title,    :string, size: 40
    field :body,    :string
    belongs_to :user, Doa.Main.User

    timestamps()
  end
  @doc false
  def changeset(story \\ %__MODULE__{}, attrs \\ %{}) do
    story
    |> cast(attrs, [:title, :body])
    |> validate_length(:title, min: 1, max: 40)
    # |> validate_format(:zipcode, ~r/^[0-9]{5}(?:-[0-9]{4})?$/, message: "Invalid zipcode")
    |> validate_required([:title])
  end

end
