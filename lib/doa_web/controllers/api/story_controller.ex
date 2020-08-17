defmodule DoaWeb.Api.StoryController do
  use DoaWeb, :api_controller
  alias Doa.Story
  alias Doa.Repo

  def index(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    stories = Repo.all(Ecto.assoc(user, :stories))
    ok(conn, %{stories: stories})
  end

  def create(conn, %{"story" => params}) do
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:stories)
      |> Story.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_story} ->
        ok(conn, created_story)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  def update(conn, %{"id" => id, "story" => params}) do
    case Repo.update(%Story{id: String.to_integer(id)} |> Story.update_changeset(params)) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    case %Story{id: String.to_integer(id)} |> Repo.delete do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end
end
