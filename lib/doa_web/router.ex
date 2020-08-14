defmodule DoaWeb.Router do
  use DoaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery # probably don't need this
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Doa.Auth.Pipeline
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  # make routes singular
  # FRONTEND CHANGES:
  # =================
  # POST /user/new             -> POST /user
  # POST /user/follow          -> PUT /user/:id
  # POST /user/change_password -> PUT /user/:id
  # POST /plants/search        -> GET /plants
  # POST /user/search        -> GET /plants

  # BACKEND CHANGES:
  # ================
  # - UserController.update diverges on ownership
  #   - if updating yourself, you can change password, and change profile, etc
  #   - if updating another user, instead of actually updating the user info, provide
  #     virtual fields which can be used to create/destroy relationships
  # - PlantInstanceController.{get_by_residence -> index, get_by_id -> show}
  # - PlantController.index += search
  # - UserController.search -> index

  scope "/api", DoaWeb.Api do
    pipe_through :api

    resources "/sessions", SessionController, only: [:show, :create]

    resources "/user", UserController, only: [:create]
    resources "/plants", PlantController, only: [:index, :show]
  end

  scope "/api", DoaWeb.Api do
    pipe_through [:api, :ensure_auth]

    resources "/sessions", SessionController, only: [:delete]

    resources "/user", UserController, only: [:index, :update]
    resources "/residences", ResidenceController, only: [:index, :create, :update, :delete]
    resources "/residences/:residence_id/plants", PlantInstanceController, only: [:index, :show, :create, :update, :delete]
    resources "/stories", StoryController, only: [:index, :create, :update, :delete]
  end

  scope "/", DoaWeb do
    pipe_through :browser
    get "/*path", SinglePageAppController, :show_application
  end
end
