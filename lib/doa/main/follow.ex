defmodule Doa.Main.Follow do
  use Ecto.Schema

  @derive Jason.Encoder
  schema "follows" do
    belongs_to :follower, Doa.Main.User
    belongs_to :followee, Doa.Main.User
  end
end
