defmodule DoaWeb.Api.PlantController do
  use DoaWeb, :api_controller
  alias Doa.Plant
  alias Doa.Repo
  import DoaWeb.Api.Helpers

  @max_result_limit 200

  def do_index(conn, limit, offset, query) do
    int_limit = parse_int(limit)
    if is_nil(int_limit) do
      error(conn, "limit #{limit} is not a valid number")
    else
      if int_limit <= @max_result_limit do
        query = from(p in query, limit: ^limit, offset: ^offset, order_by: p.scientific_name)
        plants = Repo.all query
        num_entries = Repo.aggregate(query, :count, :id)
        ok(conn, %{plants: plants, num_entries: num_entries})
      else
        error(conn, "limit exceeds the maximum size of #{@max_result_limit}")
      end
    end
  end

  #Prefer induction on the arguments as opposed to case switching

  def index(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    IO.puts "iste geldim burdayim"
    do_index(conn, limit, offset, Plant.get_search_query(filter))
  end

  def index(conn, %{"limit" => limit, "offset" => offset}) do
    IO.puts "ben bu iste ustayim"
    do_index(conn, limit, offset, Plant)
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Plant, id) do
      nil -> error(conn, "id not found in Plant database", :not_found)
      plant -> ok(conn, %{plant: plant})
    end
  end
end
