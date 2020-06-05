defmodule Doa.Repo.Migrations.CreateStates do
  use Ecto.Migration

  def change do
    create table(:states) do
      add :state,    :string, size: 40
      add :stateAbbreviation, :string, size: 2

      timestamps()
    end
  end
end

