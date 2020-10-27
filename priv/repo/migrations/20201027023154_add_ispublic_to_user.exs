defmodule Doa.Repo.Migrations.AddIspublicToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :is_public, :boolean
    end
  end
end
