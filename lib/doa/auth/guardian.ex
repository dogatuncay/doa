# defmodule Doa.GuardianSerializer do
#   @behaviour Guardian.Serializer
#   alias Doa.Repo
#   alias Doa.User

#   # def for_token(user = %User{}), do: "User:#{user.id}"
#   def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
#   def for_token(_), do: {:error, "expected a user"}

#   def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
#   def from_token(_), do: {:error, "Unknown resource type"}
# end

defmodule Doa.Auth.Guardian do
  use Guardian, otp_app: :doa

  alias Doa.User
  alias Doa.Repo

  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  def resource_from_claims(%{"sub" => id}) do
    user = Repo.get!(User, id)
    {:ok, user}
  rescue
    Ecto.NoResultsError -> {:error, :resource_not_found}
  end
end
