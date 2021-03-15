defmodule DoaWeb.ErrorView do
  use DoaWeb, :view

    def render("400.json", assigns), do: %{error: assigns[:message] || "Bad request"}
    def render("404.json", assigns), do: %{error: assigns[:message] || "Not found"}

    def render("400.html", _assigns), do: "Bad request"
    def render("404.html", _assigns), do: "Page not found"

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.html", _assigns) do
  #   "Internal Server Error"
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.html" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
