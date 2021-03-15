# Simple DSL for typechecking and requiredness checking
defmodule Doa.Parser do
  defmacro schema ~> func do
    f =
      case func do
        {:&, _, _} -> func
        {func_exp, attrs, args} ->
          var = Macro.var(:x, __MODULE__)
          new_func_call = {func_exp, attrs, [var|args]}
          quote do
            fn unquote(var) -> unquote(new_func_call) end
          end
        _ -> func
      end

    quote do
      unquote(__MODULE__).map(unquote(schema), unquote(f))
    end
  end

  # @type schema(a) :: (any() -> {:ok, a} | {:error, String.t()})
  @type schema(a) :: (any() -> {:ok, a} | {:error, String.t()}) | {:optional, (any() -> {:ok, a} | {:error, String.t()})}

  @spec map_optionless((any() -> {:ok, a} | {:error, String.t()}), (a -> {:ok, b} | {:error, String.t()})) :: (any() -> {:ok, b} | {:error, String.t()}) when a: any(), b: any()
  defp map_optionless(schema, f) do
    fn x ->
      with {:ok, y} <- schema.(x), do: f.(y)
    end
  end

  @spec map_result(schema(a), (a -> {:ok, b} | {:error, String.t()})) :: schema(b) when a: any(), b: any()
  def map_result({:optional, schema}, f), do: {:optional, map_optionless(schema, f)}
  def map_result(schema, f), do: map_optionless(schema, f)

  @spec map(schema(a), (a -> b)) :: schema(b) when a: any(), b: any()
  def map(schema, f), do: map_result(schema, fn x -> {:ok, f.(x)} end)

  @spec execute_typecheck(a, schema(a)) :: {:ok, a} | {:error, String.t()} when a: any()
  def execute_typecheck(value, {:optional, type}), do: execute_typecheck(value, type)
  def execute_typecheck(value, type), do: type.(value)

  @spec execute_typecheck(a, schema(a)) :: {:ok, a} | {:error, {:bad_request, String.t()}} when a: any()
  def typecheck(value, type) do
    case execute_typecheck(value, type) do
      {:ok, x} -> {:ok, x}
      {:error, error} -> {:error, {:bad_request, error}}
    end
  end

  defmodule Type do
    @spec bool() :: Doa.Parser.schema(bool())
    def bool() do
      fn b ->
        if is_boolean(b), do: {:ok, b}, else: {:error, "expected a boolean"}
      end
    end

    @spec integer() :: Doa.Parser.schema(integer())
    def integer() do
      fn n ->
        cond do
          is_integer(n) -> {:ok, n}
          is_binary(n) ->
            case Integer.parse(n) do
              {n, ""} -> {:ok, n}
              _ -> {:error, "expected an integer"}
            end
          true -> {:error, "expected an integer"}
        end
      end
    end

    @spec string() :: Doa.Parser.schema(String.t())
    def string() do
      fn s ->
        if is_binary(s), do: {:ok, s}, else: {:error, "expected a string"}
      end
    end

    @spec enum([atom()]) :: Doa.Parser.schema(atom())
    def enum(members) do
      member_strings = Enum.map(members, &Atom.to_string/1)
      Doa.Parser.map_result(string(), fn str ->
        if Enum.member?(member_strings, str) do
          {:ok, String.to_atom(str)}
        else
          {:error, "invalid enum, expected one of: [#{Enum.join(member_strings, ",")}]"}
        end
      end)
    end

    @spec list( Doa.Parser.schema(a)) :: Doa.Parser.schema(list(a)) when a: any()
    def list(element_schema) do
      fn l ->
        if is_list(l) do
          results = Enum.map(l, fn el -> Doa.Parser.execute_typecheck(el, element_schema) end)
          errors =
            results
            |> Enum.filter(fn
              {:error, _} -> true
              _ -> false
            end)
            |> Enum.map(fn {:error, error} -> error end)

          if Enum.empty?(errors) do
            new_list = Enum.map(results, fn {:ok, new_value} -> new_value end)
            {:ok, new_list}
          else
            {:error, "errors in list: [#{Enum.join(errors, ",")}]"}
          end
        else
          {:error, "expected a list"}
        end
      end
    end

    @spec map(%{String.t() => Doa.Parser.schema(any())}) :: Doa.Parser.schema(%{String.t() => any()})
    def map(def) do
      fn map ->
        if is_map(map) do
          # list({String.t(), {:ok, v} | {:error, String.t()}})
          results =
            def
            |> Enum.map(fn {key, type} ->
              result =
                case type do
                  {:optional, type} ->
                    if Map.has_key?(map, key), do: Doa.Parser.execute_typecheck(map[key], type), else: nil
                  _ ->
                    if Map.has_key?(map, key) do
                      Doa.Parser.execute_typecheck(map[key], type)
                    else
                      {:error, "\"#{key}\" is a required field"}
                    end
                end
              {key, result}
            end)

          # list(String.t())
          errors =
            results
            |> Enum.filter(fn
              {_, {:error, _}} -> true
              _ -> false
            end)
            |> Enum.map(fn {_, {:error, error}} -> error end)

          if Enum.empty?(errors) do
            new_map =
              results
              |> Enum.filter(fn {_, v} -> not is_nil(v) end)
              |> Enum.map(fn {key, {:ok, new_value}} -> {key, new_value} end)
              |> Map.new()
            {:ok, new_map}
          else
            {:error, "errors in map: [#{Enum.join(errors, ",")}]"}
          end
        else
          {:error, "expected a map"}
        end
      end
    end

    @spec optional(a) :: Doa.Parser.schema(a) when a: any()
    def optional(type), do: {:optional, type}
  end

  # def id(), do: map(map(Types.string(), &decode_id/1), fn n -> n * 2 end)
end
