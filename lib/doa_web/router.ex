defmodule DoaWeb.Router do
  use DoaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery # probably don't need this
    plug :put_secure_browser_headers
  end

  pipeline :session do
    plug :fetch_session
    plug Doa.Auth.Pipeline
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug :accepts, ["json"]
    plug DoaWeb.Plug.GraphQLContext
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  scope "/api", DoaWeb.Api do
    pipe_through [:api, :session]

    resources "/session", SessionController, only: [:index, :create]

    resources "/user", UserController, only: [:create]
    resources "/plant", PlantController, only: [:index, :show]
  end

  scope "/api", DoaWeb.Api do
    pipe_through [:api, :session, :ensure_auth]

    delete "/session", SessionController, :delete

    resources "/user", UserController, only: [:index, :update, :show]
    put "/user/:id/change_password", UserController, :update_password
    resources "/residence", ResidenceController, only: [:index, :create, :update, :delete]
    resources "/residence/:residence_id/plant", PlantInstanceController, only: [:index, :show, :create, :update, :delete]
    resources "/story", StoryController, only: [:index, :create, :update, :delete, :show]
    resources "/story/:story_id/comment", CommentController, only: [:index, :create]
  end

  scope "/api", DoaWeb do
    pipe_through [:api, :session]
    match :*, "/*path", Api, :missing_route
  end

  scope "/" do
    pipe_through [:session, :graphql]

    forward "/graphql", Absinthe.Plug.GraphiQL,
      schema: DoaWeb.Schema.Schema,
      interface: :simple
  end

  scope "/", DoaWeb do
    pipe_through :browser
    get "/*path", SinglePageAppController, :show_application
  end
end
