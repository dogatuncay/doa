defmodule DoaWeb.Router do
  use DoaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery # probably don't need this
    plug :put_secure_browser_headers
  end

  pipeline :auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", DoaWeb.Api do
    pipe_through :api
    resources "/plants", PlantController, only: [:index, :show]
    post "/plants/search", PlantController, :search

    post "/user/new", UserController, :create
    post "/sessions", SessionController, :create
  end

  scope "/api", DoaWeb.Api do
    pipe_through [:api, :auth]

    get "/sessions", SessionController, :get
    delete "/sessions", SessionController, :delete

    post "/user", UserController, :follow
    post "/user/search", UserController, :search
    post "/user/change_password", UserController, :update   #TODO change_password -> update

    get "/residences", ResidenceController, :get
    post "/residences", ResidenceController, :new
    put "/residences/:id", ResidenceController, :update
    delete "/residences/:id", ResidenceController, :delete

    get "/user/residences/:residence_id/plants", PlantInstanceController, :get_by_residence
    get "/user/residences/:residence_id/plants/:plant_instance_id", PlantInstanceController, :get_by_id
    post "/user/residences/:residence_id/plants", PlantInstanceController, :new
    put "/user/residences/:residence_id/plants/:plant_instance_id", PlantInstanceController, :update
    delete "/user/residences/:residence_id/plants/:plant_instance_id", PlantInstanceController, :delete

    resources "/stories", StoryController, only: [:index, :create, :update, :delete]
  end

  scope "/", DoaWeb do
    pipe_through :browser
    get "/*path", SinglePageAppController, :show_application
  end
end
