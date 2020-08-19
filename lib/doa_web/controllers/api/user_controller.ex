defmodule DoaWeb.Api.UserController do
  use DoaWeb, :api_controller
  alias Doa.User
  alias Doa.Follow
  import Comeonin.Bcrypt, only: [checkpw: 2]
  import DoaWeb.Api.Helpers

  @max_result_limit 200

  def create(conn, %{"user" => params}) do
    changeset = User.registration_changeset(%User{}, params)
    case Repo.insert(changeset) do
      {:ok, created_user} ->
        conn
        |> Doa.Auth.Authentication.dangerously_authorize(created_user)
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

  #TODO clean this up
  def update(conn, %{"id" => followee_id, "follow" => follow_request}) do
    user = Guardian.Plug.current_resource(conn)
    follow = Repo.one(from f in Follow, where: f.follower_id == ^user.id and f.followee_id == ^followee_id)
    cond do
      not is_nil(follow) and not follow_request ->
        Repo.delete!(follow)
        ok(conn)
      is_nil(follow) and follow_request ->
        followee = Repo.get(User, followee_id)
        cond do
          not is_nil(followee) ->
            case Repo.insert(%Follow{follower_id: user.id, followee_id: String.to_integer(followee_id)}) do
              {:ok, _} -> ok(conn)
              {:error, changeset} -> changeset_errors(conn, changeset.errors)
            end
          true -> error(conn, "user not found")
        end
      true -> error(conn, "nothing to change")
    end
  end

  def index(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    int_limit = parse_int(limit)
    if is_nil(int_limit) do
      error(conn, "limit #{limit} is not a valid number")
    else
      user = Guardian.Plug.current_resource(conn)
      if int_limit <= @max_result_limit do
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
          ok(conn, %{users: users, num_entries: num_entries})
        end
      else
        error(conn, "limit exceeds the maximum size of #{@max_result_limit}")
      end
    end
  end


end
