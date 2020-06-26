defmodule Doa.Repo.Migrations.CreateLists do
  use Ecto.Migration

  def change do
    create table(:residences) do
      add :title, :string, size: 40
      add :zipcode, :string, size: 10
      add :user_id, references(:users, on_delete: :nothing), null: true

      timestamps()
    end
  end
end
