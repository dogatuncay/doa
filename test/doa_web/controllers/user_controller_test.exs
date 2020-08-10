defmodule DoaWeb.UserControllerTest do
  use DoaWeb.ConnCase
  use Plug.Test
  alias Doa.Main

  @create_attrs %{
    name: "Doga Tuncay",
    user_name: "dogatuncay",
    email: "doga@tuncay.com",
    password: "tuncay123!"
  }

  @create_attrs2 %{
    name: "Old McDonald",
    user_name: "old_mcdonald",
    email: "old@mcdonald.com",
    password: "mcdonald123!"
  }

  describe "create" do
    test "creates user when data is valid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :new), user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 200)["result"]
      assert %{
               "id" => id,
               "name" => "Doga Tuncay",
               "user_name" => "dogatuncay"
             } = json_response(conn, 200)["result"]
    end
    test "creates user when data is invalid", %{conn: conn} do
      test_cases = [
        %{name: "d"},
        %{user_name: "d"},
        %{password: "d"},
        %{password: "dogadoga"},
        %{password: "dogadoga1"},
        %{email: "doga"}
      ]

      Enum.each(test_cases, fn test_case ->
        user_attrs = Map.merge(@create_attrs, test_case)
        conn = post(conn, Routes.user_path(conn, :new), user: user_attrs)
        assert json_response(conn, 400)
      end)
    end
  end

  describe "authenticated user tests" do
    setup %{ conn: conn } do
      # TODO: Figure out how to authenticate on client side
      # {:ok, token, _} = Guardian.encode_and_sign(user, :access, %{})
      # conn = put_req_header(conn, "authorization", "Bearer:" <> token)

      user = Doa.Repo.insert!(Doa.Main.User.registration_changeset(%Doa.Main.User{}, @create_attrs))
      login_conn = post(conn, Routes.session_path(conn, :create),
        %{"session" => %{"email" => @create_attrs[:email], "password" => @create_attrs[:password]}})
      auth_conn = recycle_cookies(conn, login_conn)
      {:ok, %{conn: auth_conn, user: user}}
    end

    test "change password", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :update),
        user: %{current_password: @create_attrs[:email], password: "dogatuncay2!"})
      assert json_response(conn, 200)
    end

    test "search users", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :search), filter: "none", limit: 10, offset: 0)
      assert json_response(conn, 200)["result"]["num_entries"] == 0
      conn = post(conn, Routes.user_path(conn, :search), filter: "doga", limit: 10, offset: 0)
      assert json_response(conn, 200)["result"]["num_entries"] == 1
    end

    test "follow/unfollow a user", %{conn: conn} do
      conn_new_user = post(conn, Routes.user_path(conn, :new), user: @create_attrs2)
      assert %{"id" => id} = json_response(conn_new_user, 200)["result"]
      conn_follow = post(conn, Routes.user_path(conn, :follow), id: id, follow: true)
      assert json_response(conn_follow, 200)["ok"]
      conn_follow = post(conn, Routes.user_path(conn, :follow), id: id, follow: false)
      assert json_response(conn_follow, 200)["ok"]
    end
  end
end
