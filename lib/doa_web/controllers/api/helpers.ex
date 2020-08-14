defmodule DoaWeb.Api.Helpers do
  def parse_int(n) when is_integer(n), do: n
  def parse_int(n) when is_binary(n), do: String.to_integer(n)
  def parse_int(_), do: nil
end
