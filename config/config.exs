# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :doa,
  ecto_repos: [Doa.Repo]

# Configures the endpoint
config :doa, DoaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "XZKGVceKiYw43djY22uuz4v1I5J6eRHi2zJMBNwt4T2Jx2wjpHK62e14wsyGT5ku",
  render_errors: [view: DoaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Doa.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "OQ/Yf571"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

# config :guardian, Guardian,
#   allowed_algos: ["HS512"],
#   verify_module: Guardian.JWT,
#   issuer: "Doa",
#   ttl: { 30, :days},
#   verify_issuer: true,
#   secret_key: "Bleu",
#   serializer: Doa.GuardianSerializer

config :doa, Doa.Auth.Guardian,
  issuer: "Doa",
  secret_key: "P+SowZ+AVWnOEmA84BDUB6XzbtFEKpRE7n3Qjs12pbJs3br4bGBVYizAAUhcd6yD"
