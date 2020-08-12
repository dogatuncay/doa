defmodule Doa.GuardianSerializer do
  @behaviour Guardian.Serializer
  alias Doa.Repo
  alias Doa.User

  # def for_token(user = %User{}), do: "User:#{user.id}"
  def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "expected a user"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end
