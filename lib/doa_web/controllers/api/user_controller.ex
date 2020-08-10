defmodule DoaWeb.Api.UserController do
  import Comeonin.Bcrypt, only: [checkpw: 2]
  use DoaWeb, :controller
  alias Doa.Main.User
  alias Doa.Main.Follow
  alias Doa.Repo
  require IEx
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  plug :put_view, DoaWeb.ApiView

  @max_limit 200

  defp parse_int(n) when is_integer(n), do: n
  defp parse_int(s) when is_binary(s), do: String.to_integer(s)
  defp tot_num_of_records(query) do
    Repo.aggregate(query, :count, :id)
  end

  def new(conn, %{"user" => params}) do
    changeset = User.registration_changeset(%User{}, params)
    case Repo.insert(changeset) do
      {:ok, created_user} ->
        Doa.Auth.login(conn, created_user)
        |> render("ok.json", result: created_user)
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("changeset_errors.json", errors: changeset.errors)
    end
  end

  def update(conn, %{"user" => params}) do
    logged_in_user = Guardian.Plug.current_resource(conn)
    if checkpw(Map.get(params, "current_password"), logged_in_user.password_hash) do
        password = Map.get(params, "password")
        changeset = User.password_changeset(logged_in_user, %{password: password})
        case Repo.update(changeset) do
          {:ok, _} ->
            render(conn, "ok.json")
          {:error, changeset} ->
            conn
            |> render("changeset_errors.json", errors: changeset.errors)
        end
      else
        changeset =
          change(%User{})
          |> add_error(:current_password, "incorrect password")
        render(conn, "changeset_errors.json", errors: changeset.errors)
    end
  end

  defp user_follow_query(query, user_id) do
    from p in query,
      left_join: f in subquery(from f in Follow,
      where: f.follower_id == ^user_id),
      on: f.followee_id == p.id,
      select: %{user: p, am_following: not is_nil(f.follower_id)} #**
  end

  def search(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    try do
      user = Guardian.Plug.current_resource(conn)
      if parse_int(limit) <= @max_limit do
        search_query = User.search(filter)
        num_entries = tot_num_of_records(search_query)
        paginated_query = (from q in search_query, limit: ^limit, offset: ^offset) |> user_follow_query(user.id)

        case Repo.all(paginated_query) do
          nil -> render(conn, "error.json", %{message: "problem with the search"})
          users ->
          #   users = Enum.map(users, fn %{person: person, am_following: am_following} ->
          #     Map.put(person, :am_following, am_following)
          #   end)
            # IO.inspect users
            render(conn, "ok.json", %{result: %{users: users, num_entries: num_entries}})
        end
      else
        render(conn, "error.json", %{message: "limit exceeds the maximum size of #{@max_limit}"})
      end
    rescue
      _ in ArgumentError -> render(conn, "error.json", %{message: "limit #{limit} is not a valid number"})
      _ in Ecto.Query.CastError -> render(conn, "error.json", %{message: "cannot cast the request parameters"})
    end
  end
  #TODO
  def follow(conn, %{"id" => id, "follow" => follow}) do
    followee = Repo.get(User, id)
    user =
      Guardian.Plug.current_resource(conn)
      |> Doa.Repo.preload(:followees)
    if follow do
      changeset =
        user
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:followees, [followee | user.followees])
      result = Doa.Repo.update(changeset)
      case result do
        {:ok, _} ->
          render(conn, "ok.json")
        {:error, changeset} ->
          conn
          |> render("changeset_errors.json", errors: changeset.errors)
      end
      else
        from(f in Doa.Main.Follow, where: f.follower_id == ^user.id and f.followee_id == ^id)
        |> Doa.Repo.delete_all
        render(conn, "ok.json")
    end
  end
end
