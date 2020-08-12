defmodule DoaWeb.Api.PlantController do
  use DoaWeb, :api_controller
  alias Doa.Plant
  alias Doa.Repo

  @max_limit 200

  # TODO: remove because uneccessary
  defp tot_num_of_records(query) do
    Repo.aggregate(query, :count, :id)
  end

  # TODO: same
  defp parse_int(n) when is_integer(n), do: n
  defp parse_int(s) when is_binary(s), do: String.to_integer(s)

  def index(conn, %{"limit" => limit, "offset" => offset}) do
    # TODO: no large try/rescues
    try do
      if parse_int(limit) <= @max_limit do
        query = from(p in Plant, limit: ^limit, offset: ^offset, order_by: p.scientific_name)
        plants = Repo.all query
        num_entries = tot_num_of_records(Plant)

        ok(conn, %{
          result: %{
            plants: plants,
            num_entries: num_entries
          }
        })
      else
        error(conn, "limit exceeds the maximum size of #{@max_limit}")
      end
    rescue
      _ in ArgumentError -> error(conn, "limit #{limit} is not a valid number")
      _ in Ecto.Query.CastError -> error(conn, "cannot cast the request parameters")
    end
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Plant, id) do
      nil -> error(conn, "id not found in Plant database") # TODO: you should be returning a 404 :not_found in this case
      plant -> ok(conn, %{plant: plant})
    end
  end

  def search(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    # same, remove try/rescue (if you do want patterns around handling errors, you don't put them in the controller code like this)
    try do
      if parse_int(limit) <= @max_limit do
        search_query = Plant.get_search_query(filter)
        num_entries = tot_num_of_records(search_query)
        paginated_query = (from q in search_query, limit: ^limit, offset: ^offset)

        # query = from(p in Plant.search(filter), limit: ^limit, offset: ^offset)
        case Repo.all(paginated_query) do
          nil -> error(conn, "problem with the search")
          plants ->  ok(conn, %{plants: plants, num_entries: num_entries})
        end
      else
        error(conn, "limit exceeds the maximum size of #{@max_limit}")
      end
    rescue
      _ in ArgumentError -> error(conn, "limit #{limit} is not a valid number")
      _ in Ecto.Query.CastError -> error(conn, "cannot cast the request parameters")
    end
  end
end
