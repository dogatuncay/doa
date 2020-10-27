defmodule Doa.Permissions do
  alias Doa.Repo
  alias Doa.Follow
  import Ecto.Query, only: [from: 2]

  def is_following?(followee, follower) do
    query = from f in Follow, where: f.followee_id == ^followee.id and f.follower_id == ^follower.id
    Repo.exists?(query)
  end

  def is_permitted?(user_from, user_to) do
    if user_to.is_public or is_following?(user_from, user_to), do: true, else: false
  end
end
