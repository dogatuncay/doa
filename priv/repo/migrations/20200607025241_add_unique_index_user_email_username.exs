defmodule Doa.Repo.Migrations.AddUniqueIndexUserEmailUsername do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:email, :user_name])
  end
end
