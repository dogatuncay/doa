defmodule DoaWeb.ApiView do
  use DoaWeb, :view

  def render("ok.json", %{result: result}) do
    %{
      ok: true,
      result: result
    }
  end

  def render("ok.json", _) do
    %{
      ok: true
    }
  end

  def render("changeset_errors.json", %{errors: errors}) do
    errors_keyword_list =
      Enum.map errors, fn {field, {error_msg, error_ctx}} ->
        {field, %{
          "message" => error_msg,
          "context" => Enum.into(error_ctx, %{})
        }}
      end
    errors_map = Enum.into(errors_keyword_list, %{})
    %{
      ok: false,
      errors: errors_map
    }
  end

  def render("error.json", %{message: message}) do
    %{
      ok: false,
      message: message
    }
  end
end
