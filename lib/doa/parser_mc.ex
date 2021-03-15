defmodule Doa.ParserMC do
  # defmacro test({:%{}, attrs, members}) do
  #   new_members =
  #     Enum.map(members, fn {key, value} ->
  #       new_value = quote do: unquote(__MODULE__).test(unquote(value))
  #       {key, new_value}
  #     end)
  #   new_map = {:%{}, attrs, new_members}
  #   quote do: {:ok, unquote(new_map)}
  # end
  # defmacro test(x) do
  #   quote do: {:ok, unquote(x)}
  # end

  def map_def({:%{}, attrs, members}, f) do
    new_members = Enum.map(members, fn {k, v} -> {k, f.(v)} end)
    f.({:%{}, attrs, new_members})
  end
  def map_def(x, f), do: f.(x)

  defmacro test(ast) do
    map_def(ast, fn x -> {:ok, x} end)
  end
end

# {
#   :test,
#   [],
#   [
#     {
#       :%{},
#       [line: 12],
#       [a: 1, b: {:%{}, [line: 14], [c: 2]}]
#     }
#   ]
# }

# {
#   :%{},
#   [line: 12],
#   [a: {:ok, 1}, b: {:test, [], [{:%{}, [line: 14], [c: 2]}]}]
# }

# {
#   :%{},
#   [line: 19],
#   [a: {:ok, 1}, b: {:ok, {:%{}, [line: 21], [c: {:ok, 2}]}}]
# }

defmodule Doa.ParserMC.Test do
  require Doa.ParserMC
  import Doa.ParserMC

  IO.inspect(test %{
    a: 1,
    b: %{
      c: 2
    }
  })

  test %{
    a: {:ok, 1},
    b: {:ok, %{
      c: {:ok, 2}
    }}
  }
end
