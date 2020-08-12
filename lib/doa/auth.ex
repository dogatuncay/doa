defmodule Doa.Auth do
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Plug.Conn
  # import Plug.Conn

  def dangerously_authorize(conn, user) do
    Guardian.Plug.sign_in(conn, user, :access)
  end

  @spec valid_credentials?(String.t(), String.t()) :: {:valid, %Doa.User{}} | :invalid
  def valid_credentials?(email, pass) do
    user = Doa.Repo.get_by(Doa.User, email: email)

    if user do
      if checkpw(pass, user.password_hash) do
        {:valid, user}
      else
        :invalid
      end
    else
      dummy_checkpw()
      :invalid
    end
  end

  @spec authorize(Conn.t(), String.t(), String.t()) :: {:ok, Conn.t()} | :error
  def authorize(conn, email, pass) do
    case valid_credentials?(email, pass) do
      {:valid, user} -> {:ok, dangerously_authorize(conn, user)}
      :invalid -> :error
    end
  end
end
