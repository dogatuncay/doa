defmodule DoaWeb.ResidenceControllerTest do
  use DoaWeb.ConnCase
  use Plug.Test
  alias Doa.Main

  use Doa.Fixtures, [:authenticated_connection]

  @create_attrs %{
    title: "my residence",
    zipcode: "90000"
  }


  describe "authenticated user" do
    test "create a residence", %{conn: conn} do
      conn = post(authenticated_connection, Routes.residence_path(conn, :create), residence: @create_attrs)
      assert json_response(conn, 200)  == true
    end
  end
end
