defmodule DoaWeb.UserControllerTest do
  use DoaWeb.ConnCase
  use Plug.Test
  alias Doa.Main

  use Doa.Fixtures, [:auth_conn, :user]

  @create_attrs %{
    title: "my residence",
    zipcode: "90000"
  }


  # describe "residence tests with authenticated user" do
  #   test "create a residence", %{auth_conn: auth_conn} do

  #   end
  end
end
