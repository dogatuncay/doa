defmodule Doa.Repo.Migrations.CreateFollows do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :follower_id, references(:users, on_delete: :nothing), null: true
      add :followee_id, references(:users, on_delete: :nothing), null: true
    end
  end
end
