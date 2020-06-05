defmodule Doa.Repo do
  use Ecto.Repo,
    otp_app: :doa,
    adapter: Ecto.Adapters.Postgres
end
