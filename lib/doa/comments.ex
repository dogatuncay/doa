defmodule Doa.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  import Ecto.Query, only: [from: 2]

  @derive {Jason.Encoder, only: [:id, :body, :upvote, :user_id, :story_id, :parent_comment]}
  schema "comments" do
    field :upvote, :integer, default: 0
    field :body, :string

    belongs_to :user, Doa.User
    belongs_to :story, Doa.Story

    belongs_to :parent, Doa.Comment, foreign_key: :parent_comment
    has_many :children, Doa.Comment, foreign_key: :parent_comment

    timestamps()
  end

  def create_changeset(comment \\ %__MODULE__{}, attrs \\ %{}) do
    comment
    |> cast(attrs, [:body, :parent_comment])
    |> assoc_constraint(:parent)
    |> validate_required([:body])
  end

  def upvote(comment_id), do: up_or_down_vote(comment_id, 1)
  def downvote(comment_id), do: up_or_down_vote(comment_id, -1)
  def up_or_down_vote(comment_id, dir) do
    query = from(c in Doa.Comment, where: c.id == ^comment_id, update: [inc: [upvote: ^dir]])
    Doa.Repo.update_all(query, [])
  end

  def delete_and_reorg_children(comment) do
    query = from i in Doa.Comment, where: i.parent_comment == ^comment.id
    Doa.Repo.update_all(query, set: [parent_comment: comment.parent_comment])
    Doa.Repo.delete(comment)
  end
end
