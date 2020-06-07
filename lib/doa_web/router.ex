defmodule DoaWeb.Router do
  use DoaWeb, :router
  @derive {Jason.Encoder}

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
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

  # Other scopes may use custom stacks.
  scope "/api", DoaWeb.Api do
    pipe_through :api
    get "/plants", PlantController, :index
    get "/plants/:id", PlantController, :get
    post "/plants/search", PlantController, :search

    post "/user/new", UserController, :new
    # resources "/sessions", SessionController, only: [:create]
    post "/sessions", SessionController, :create
  end

  scope "/api", DoaWeb.Api do
    pipe_through [:api, :auth]
    post "/user/edit", UserController, :edit
  end


  scope "/", DoaWeb do
    pipe_through :browser
    get "/*path", SinglePageAppController, :show_application
  end
end
