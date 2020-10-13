defmodule Doa.Repo.Migrations.AddCommentsTable do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :string
      add :upvote, :integer
      add :user_id, references(:users, on_delete: :nothing)
      add :story_id, references(:stories, on_delete: :nothing)
      add :parent_comment, references(:comments, on_delete: :nothing)

      timestamps()
    end

    create index(:comments, [:user_id])
  end
end
