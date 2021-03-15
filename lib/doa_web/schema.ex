defmodule DoaWeb.Schema.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema.Notation, :modern


  import_types Absinthe.Type.Custom
  import_types(DoaWeb.Schema.PlantTypes)
  import_types(DoaWeb.Schema.UserTypes)
  import_types(DoaWeb.Schema.StoryTypes)
  import_types(DoaWeb.Schema.CommentTypes)
  import_types(DoaWeb.Schema.ResidenceTypes)
  import_types(DoaWeb.Schema.PlantInstanceTypes)


  query do
    @desc "Get a list of plants"
    field :plants, list_of(:plant) do
      resolve &DoaWeb.Resolvers.Plant.plants/3
    end

    @desc "Get a plant"
    field :plant, :plant do
      arg :id, :integer
      arg :accepted_symbol, :string
      arg :common_name, :string

      resolve &DoaWeb.Resolvers.Plant.plant/3
    end

    @desc "Get current user"
    field :current_user, :user do
      resolve &DoaWeb.Resolvers.User.current_user/3
    end

    @desc "Get a story by id"
    field :story, :story do
      arg :id, :integer
      resolve &DoaWeb.Resolvers.Story.story/3
    end

    @desc "Get all stories"
    field :stories, list_of(:story) do
      arg :id, :integer
      resolve &DoaWeb.Resolvers.Story.stories/3
    end

    @desc "Get comments"
    field :comments, list_of(:comment) do
      arg :id, :integer
      arg :parent_comment, :integer
      resolve &DoaWeb.Resolvers.Comment.comments/3
    end

    @desc "Get residences"
    field :residences, list_of(:residence) do
      resolve &DoaWeb.Resolvers.Residence.residences/3
    end
  end
end
