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

  defp traverse({:%{}, attrs, members}, f) do
    new_members = Enum.map(members, fn {k, v} -> {k, f.(v)} end)
    f.({:%{}, attrs, new_members})
  end
  defp traverse(x, f), do: f.(x)

  defp visit({:%{}, _, _} = ast) do
    quote do: Type.map(unquote(ast))
  end
  defp visit(ast), do: ast

  defmacro test(ast) do
    result = traverse(ast, &visit/1)
    quote do: IO.inspect(unquote(Macro.to_string(result)))
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

  test %{
    a: integer(),
    b: %{
      c: enum([:x, :y, :z])
    }
  }
end
