use Mix.Config

# Configure your database
config :doa, Doa.Repo,
  username: "postgres",
  password: "postgres",
  database: "doa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :doa, DoaWeb.Endpoint,
  http: [port: 4002],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn
