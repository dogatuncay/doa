defmodule Doa.Main.State do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__]}
  schema "states" do
    field :state,    :string, size: 40
    field :stateAbbreviation, :string, size: 2

    timestamps()
  end

  @doc false
  def changeset(state, attrs) do
    state
    |> cast(attrs,
    [:state,
    :stateAbbreviation])
    # |> validate_required()
  end
end
