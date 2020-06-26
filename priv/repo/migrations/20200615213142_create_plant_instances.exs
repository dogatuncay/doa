defmodule Doa.Repo.Migrations.CreatePlantInstances do
  use Ecto.Migration

  def change do
    create table(:plant_instances) do
      add :note, :string
      add :is_indoor, :boolean
      add :is_containerized, :boolean
      add :light_requirement, :integer

      add :user_id, references(:users, on_delete: :nothing), null: false
      add :residence_id, references(:residences, on_delete: :nothing), null: false
      add :plant_id, references(:plants, on_delete: :nothing), null: false

      timestamps()
    end
  end
end
