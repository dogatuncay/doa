defmodule DoaWeb.Api.UserController do
  use DoaWeb, :api_controller
  alias Doa.User
  alias Doa.Follow
  import Comeonin.Bcrypt, only: [checkpw: 2]

  # TODO: max limit of what? too generic of a name
  @max_limit 200

  defp parse_int(n) when is_integer(n), do: n
  defp parse_int(s) when is_binary(s), do: String.to_integer(s)

  def create(conn, %{"user" => params}) do
    changeset = User.registration_changeset(%User{}, params)
    case Repo.insert(changeset) do
      {:ok, created_user} ->
        conn
        |> Doa.Auth.dangerously_authorize(created_user)
        |> ok(created_user)
      {:error, %Ecto.Changeset{} = changeset} -> changeset_errors(conn, changeset.errors)
    end
  end

  def update(conn, %{"user" => params}) do
    logged_in_user = Guardian.Plug.current_resource(conn)
    if checkpw(Map.get(params, "current_password"), logged_in_user.password_hash) do
      password = Map.get(params, "password")
      changeset = User.password_changeset(logged_in_user, %{password: password})
      case Repo.update(changeset) do
        {:ok, _} -> ok(conn)
        {:error, changeset} -> changeset_errors(conn, changeset.errors)
      end
    else
      changeset = add_error(change(%User{}), :current_password, "incorrect password")
      changeset_errors(conn, changeset.errors)
    end
  end

  # TODO: refactor out try/rescue (you don't have to remove it completely, but you can't have this large of a try/rescue)
  def search(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    try do
      user = Guardian.Plug.current_resource(conn)
      if parse_int(limit) <= @max_limit do
        # TODO: refactor this query composition
        search_query = User.get_search_query(filter)
        num_entries = Repo.aggregate(search_query, :count, :id)
        paginated_query = (from q in search_query, limit: ^limit, offset: ^offset) |> User.user_follow_query(user.id)

        case Repo.all(paginated_query) do
          nil -> error(conn, "problem with the search")
          users ->
          # TODO: get help here
          #   users = Enum.map(users, fn %{person: person, am_following: am_following} ->
          #     Map.put(person, :am_following, am_following)
          #   end)
          # IO.inspect users
          ok(conn, %{users: users, num_entries: num_entries})
        end
      else
        error(conn, "limit exceeds the maximum size of #{@max_limit}")
      end
    rescue
      # which functions could throw an argument
      # for each function that could, what's the control flow to get to here
      _ in ArgumentError -> error(conn, "limit #{limit} is not a valid number")
      # cast parameters should probably be handled by the framework, not you
      _ in Ecto.Query.CastError -> error(conn, "cannot cast the request parameters")
    end
  end

  def follow(conn, %{"id" => followee_id, "follow" => follow_request}) do
    user = Guardian.Plug.current_resource(conn)
    follow = Repo.one(from f in Follow, where: f.follower_id == ^user.id and f.followee_id == ^followee_id)
    IO.puts follow
    cond do
      not is_nil(follow) and not follow_request ->
        Repo.delete!(follow)
        ok(conn)
      follow_request ->
        case Repo.insert(Ecto.build_assoc(user, :followees, followee_id: followee_id)) do
          {:ok, _} -> ok(conn)
          {:error, changeset} -> changeset_errors(conn, changeset.errors)
        end
      true -> error(conn, "nothing to change")
    end
  end
end
