defmodule DoaWeb.Schema.UserTypes do
  use Absinthe.Schema.Notation

  alias Doa.Repo

  object :user do
    field :id, :integer
    field :name, non_null(:string)
    field :user_name, non_null(:string)
    field :is_public, :boolean

    field :stories, list_of(:story) do
      resolve fn user, _, _ ->
        stories = user |> Ecto.assoc(:stories) |> Repo.all
        {:ok, stories}
      end
    end
  end

  input_object :user_input do
    field :name, non_null(:string)
    field :user_name, non_null(:string)
    field :email, non_null(:string)
    field :password, non_null(:string)
    field :is_public, :boolean
  end
end
