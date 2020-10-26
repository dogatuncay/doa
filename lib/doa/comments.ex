defmodule Doa.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @derive {Jason.Encoder, only: [:id, :body, :user_id, :story_id, :parent_comment]}
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

  def delete_and_reorg_children(comment) do
    query = from i in Doa.Comment, where: i.parent_comment == ^comment.id
    Doa.Repo.update_all(query, set: [parent_comment: comment.parent_comment])
    Doa.Repo.delete(comment)
  end


  defmodule Tree do
    defstruct [:data, :children]

    def map_depth_first(node, f) do
      mapped_children = Enum.map(node.children, &map_depth_first(&1, f))
      f.(node.data, mapped_children)
    end

    defp index_tree(data) do
      Enum.reduce(data, {[], %{}}, fn comment, {roots, relationships} ->
        if comment.parent_comment == nil do
          {[comment|roots], relationships}
        else
          {roots, Map.update(relationships, comment.parent_comment, [comment],  fn children ->
            [comment|children]
          end)}
        end
      end)
    end

    defp build_by_index(comment, children) do
      children = Enum.map(Map.get(children, comment.id, []), &build_by_index(&1, children))
      %__MODULE__{
        data: comment,
        children: children
      }
    end

    def construct_tree(comments) do
      {roots, child_index} = index_tree(comments)
      Enum.map(roots, fn root -> build_by_index(root, child_index) end)
      |> Enum.reverse
    end
  end
end
