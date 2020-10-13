defmodule DoaWeb.Api.CommentController do
  use DoaWeb, :api_controller
  alias Doa.Comment
  alias Doa.Repo

  def index(conn, params = %{"story_id" => story_id}) do
    story = Repo.get(Story, story_id)
    comments = Repo.all(Ecto.assoc(story, :stories))
    ok(conn, %{comments: comments})
  end

  def create(conn, %{"story_id" => story_id, "comment" => comment_params}) do
    params = Map.put(comment_params, "story_id", story_id)
    changeset =
      Guardian.Plug.current_resource(conn)
      |> Ecto.build_assoc(:stories)
      |> Comment.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_comment} ->
        ok(conn, created_comment)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

end
