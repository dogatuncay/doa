defmodule DoaWeb.Api.CommentController do
  use DoaWeb, :api_controller
  alias Doa.Comment
  alias Doa.User
  alias Doa.Repo
  import Ecto.Query, only: [from: 2]

  def index(conn, %{"story_id" => story_id}) do
    query = from c in Comment,
      where: c.story_id == ^story_id,
      join: u in User,
      on: c.user_id == u.id,
      select: %{comment: c, user_name: u.user_name}
    comments_and_user_names = Repo.all(query)
    comments = Enum.map(comments_and_user_names, fn %{comment: c} -> c end)
    users = Enum.map(comments_and_user_names, fn %{comment: c, user_name: user_name} ->
      %User{
        id: c.user_id,
        user_name: user_name
      }
    end)
    ok(conn, %{comments: comments, users: users})
  end

  def create(conn, %{"story_id" => story_id, "comment" => comment_params}) do
      user = Guardian.Plug.current_resource(conn)
      changeset =
        Repo.get(Doa.Story, story_id)
        |> Ecto.build_assoc(:comments)
        |> Comment.create_changeset(comment_params)
        |> Ecto.Changeset.put_assoc(:user, user)

    case Repo.insert(changeset) do
      {:ok, created_comment} ->
        ok(conn, created_comment)
      {:error, %Ecto.Changeset{} = changeset} ->
        error(conn, changeset.errors)
    end
  end

end
