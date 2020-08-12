defmodule Doa.Repo.Migrations.UpdateStoryBodyDataType do
  use Ecto.Migration

  def change do
    alter table(:stories) do
      modify :body, :text
    end
  end
end
