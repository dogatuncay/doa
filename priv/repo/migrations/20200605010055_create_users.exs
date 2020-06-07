defmodule Doa.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :user_name, :string, size: 20
      add :name, :string, size: 100
      add :email, :string, size: 320
      add :password_hash, :string

      timestamps()
    end
  end
end
