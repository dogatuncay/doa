defmodule DoaWeb.Api.PlantController do
  use DoaWeb, :api_controller
  alias Doa.Plant
  alias Doa.Repo
  import DoaWeb.Api.Helpers

  @max_limit 200

  def index(conn, %{"limit" => limit, "offset" => offset}) do
    int_limit = parse_int(limit)
    if is_nil(int_limit) do
      error(conn, "limit #{limit} is not a valid number")
    else
      if int_limit <= @max_limit do
        query = from(p in Plant, limit: ^limit, offset: ^offset, order_by: p.scientific_name)
        plants = Repo.all query
        num_entries = Repo.aggregate(query, :count, :id)
        ok(conn, %{result: %{plants: plants, num_entries: num_entries}})
      else
        error(conn, "limit exceeds the maximum size of #{@max_limit}")
      end
    end
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Plant, id) do
      nil -> error(conn, "id not found in Plant database", 404)
      plant -> ok(conn, %{plant: plant})
    end
  end

  def search(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    int_limit = parse_int(limit)
    if is_nil(int_limit) do
      error(conn, "limit #{limit} is not a valid number")
    else
      if int_limit <= @max_limit do
        search_query = Plant.get_search_query(filter)
        num_entries = Repo.aggregate(search_query, :count, :id)
        paginated_query = (from q in search_query, limit: ^limit, offset: ^offset)
        # query = from(p in Plant.search(filter), limit: ^limit, offset: ^offset)
        case Repo.all(paginated_query) do
          nil -> error(conn, "problem with the search")
          plants ->  ok(conn, %{plants: plants, num_entries: num_entries})
        end
      else
        error(conn, "limit exceeds the maximum size of #{@max_limit}")
      end
    end
  end

end
