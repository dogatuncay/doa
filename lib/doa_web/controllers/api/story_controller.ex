defmodule DoaWeb.Api.StoryController do
  use DoaWeb, :controller
  alias Doa.Main.Story
  alias Doa.Repo
  require IEx
  # import Ecto.Query, only: [from: 2]

  plug :put_view, DoaWeb.ApiView

  def get(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    stories = Repo.all(Ecto.assoc(user, :stories))
    render(conn, "ok.json", %{result: %{stories: stories}})
  end
  def new(conn, %{"story" => params}) do
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:stories)
      |> Story.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_story} ->
        render(conn, "ok.json", result: created_story)
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

  def update(conn, %{"id" => id, "story" => params}) do
    story = Repo.get!(Story, id)
    case Story.changeset(story, params) |> Repo.update do
      {:ok, _} ->
        render(conn, "ok.json")
      {:error, changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

  def delete(conn, %{"id" => id}) do
    story = Repo.get!(Story, id)
    case story.delete(story) do
      {:ok, _} ->
        render(conn, "ok.json")
      {:error, changeset} ->
        conn
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

end
