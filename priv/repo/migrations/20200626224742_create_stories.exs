defmodule Doa.Repo.Migrations.CreateStories do
  use Ecto.Migration

  def change do
    create table(:stories) do
      add :title, :string, size: 40
      add :body, :string
      add :user_id, references(:users, on_delete: :nothing), null: true

      timestamps()
    end
  end
end
