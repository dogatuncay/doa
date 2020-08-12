defmodule Doa.Follow do
  use Ecto.Schema

  @derive Jason.Encoder
  schema "follows" do
    belongs_to :follower, Doa.User
    belongs_to :followee, Doa.User
  end
end
