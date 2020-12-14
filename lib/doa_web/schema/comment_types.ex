defmodule DoaWeb.Schema.CommentTypes do
  use Absinthe.Schema.Notation

  object :comment do
    field :id, non_null(:integer)
    field :upvote, non_null(:string)
    field :body, non_null(:string)
    field :parent_comment, :integer
  end
end
