defmodule Doa.Story do
  use Ecto.Schema
  import Ecto.Changeset

  @optional_fields []
  @required_fields [:title, :body]
  @fields @optional_fields ++ @required_fields

  @derive {Jason.Encoder, only: [:id, :title, :body, :user_id]}
  schema "stories" do
    field :title,    :string, size: 40
    field :body,    :string
    belongs_to :user, Doa.User

    timestamps()
  end
  @doc false
  def update_changeset(story \\ %__MODULE__{}, attrs \\ %{}) do
    story
    |> cast(attrs, @fields)
    |> validate_length(:title, min: 1, max: 40)
    |> validate_length(:body, min: 140, max: 100000)
  end

  def create_changeset(story \\ %__MODULE__{}, attrs \\ %{}) do
    story
    |> update_changeset(attrs)
    |> validate_required(@required_fields)
  end

end
