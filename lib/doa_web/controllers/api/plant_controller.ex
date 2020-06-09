defmodule DoaWeb.Api.PlantController do
  use DoaWeb, :controller
  alias Doa.Main.Plant
  alias Doa.Repo
  require IEx
  import Ecto.Query, only: [from: 2]

  plug :put_view, DoaWeb.ApiView

  @max_limit 200

  defp tot_num_of_records(query) do
    Repo.aggregate(query, :count, :id)
  end

  defp parse_int(n) when is_integer(n), do: n
  defp parse_int(s) when is_binary(s), do: String.to_integer(s)

  def index(conn, %{"limit" => limit, "offset" => offset}) do
    try do
      if parse_int(limit) <= @max_limit do
        query = from(p in Plant, limit: ^limit, offset: ^offset, order_by: p.scientific_name)
        plants = Repo.all query
        num_entries = tot_num_of_records(Plant)

        render(conn, "ok.json", %{
          result: %{
            plants: plants,
            num_entries: num_entries
          }
        })
      else
        render(conn, "error.json", %{message: "limit exceeds the maximum size of #{@max_limit}"})
      end
    rescue
      _ in ArgumentError -> render(conn, "error.json", %{message: "limit #{limit} is not a valid number"})
      _ in Ecto.Query.CastError -> render(conn, "error.json", %{message: "cannot cast the request parameters"})
    end
  end

  def get(conn, %{"id" => id}) do
    case Repo.get(Plant, id) do
      nil -> render(conn, "error.json", %{message: "id not found in Plant database"})
      plant -> render(conn, "ok.json", %{result: %{plant: plant}})
    end
  end

  def search(conn, %{"filter" => filter, "limit" => limit, "offset" => offset}) do
    try do
      if parse_int(limit) <= @max_limit do
        search_query = Plant.search(filter)
        num_entries = tot_num_of_records(search_query)
        paginated_query = (from q in search_query, limit: ^limit, offset: ^offset)

        # query = from(p in Plant.search(filter), limit: ^limit, offset: ^offset)
        case Repo.all(paginated_query) do
          nil -> render(conn, "error.json", %{message: "problem with the search"})
          plants ->  render(conn, "ok.json", %{result: %{plants: plants, num_entries: num_entries}})
        end
      else
        render(conn, "error.json", %{message: "limit exceeds the maximum size of #{@max_limit}"})
      end
    rescue
      _ in ArgumentError -> render(conn, "error.json", %{message: "limit #{limit} is not a valid number"})
      _ in Ecto.Query.CastError -> render(conn, "error.json", %{message: "cannot cast the request parameters"})
    end
  end
end
