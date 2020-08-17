defmodule Doa.Fixtures do
  @moduledoc """
  A module for defining fixtures that can be used in tests.
  """

  def user do
    quote do
      @create_attrs %{
        name: "Doga Tuncay",
        user_name: "dogatuncay",
        email: "doga@tuncay.com",
        password: "tuncay123!"
      }

      def user_fixture(conn, attrs \\ %{}) do
        user = Doa.Repo.insert!(Doa.User.registration_changeset(%Doa.User{}, @create_attrs))
        login_conn = post(conn, Routes.session_path(conn, :create),
          %{"session" => %{"email" => @create_attrs[:email], "password" => @create_attrs[:password]}})
        auth_conn = recycle_cookies(conn, login_conn)
        {:ok, %{auth_conn: auth_conn, user: user}}
      end
    end
  end

  defmacro __using__(fixtures) when is_list(fixtures) do
    for fixture <- fixtures, is_atom(fixture),
      do: apply(__MODULE__, fixture, [])
  end
end
