defmodule Doa.Repo.Migrations.DropCompositeUniqueIndexCreateSeparateEmailUsernameIndex do
  use Ecto.Migration

  def change do
    drop unique_index(:users, [:email, :user_name])
    create unique_index(:users, [:email])
    create unique_index(:users, [:user_name])
  end
end
