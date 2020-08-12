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
      |> Story.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_story} ->
        ok(conn, created_story)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

  #TODO Doa.Repo.update!(%Doa.Story{id: 166} |> Ecto.Changeset.change(%{:body => "asdfasdfasdfasdfasdafjkasfkjasfjkafsjkasjkasf"}))
  def update(conn, %{"id" => id, "story" => params}) do
    story = Repo.get!(Story, id)
    case Story.changeset(story, params) |> Repo.update do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    story = Repo.get!(Story, id)
    case Repo.delete(story) do
      {:ok, _} ->
        ok(conn)
      {:error, changeset} ->
        error(conn, changeset.errors)
    end
  end
end
