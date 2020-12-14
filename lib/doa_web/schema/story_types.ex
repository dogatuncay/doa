defmodule DoaWeb.Schema.StoryTypes do
  use Absinthe.Schema.Notation
  alias Doa.Repo
  import Ecto.Query

  object :story do
    field :id, non_null(:integer)
    field :title, non_null(:string)
    field :body, non_null(:string)
    field :user_id, non_null(:integer)

    field :comments, list_of(:comment) do
      # questionable query parameter for here, this is for discovery
      arg :parent_comment, :integer

      resolve fn story, %{parent_comment: parent_comment}, _ ->
        query = story |> Ecto.assoc(:comments)
        query = if parent_comment == nil, do: query, else: where(query, parent_comment: ^parent_comment)
        comments = Repo.all(query)
        {:ok, comments}
      end
    end
  end

  input_object :story_input do
    field :title, non_null(:string)
    field :body, non_null(:string)
  end
end
