defmodule Doa.Auth do
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  alias Plug.Conn
  # import Plug.Conn

  def login(conn, user) do
    conn
    |> Guardian.Plug.sign_in(user, :access)
  end

  @spec login_by_email_and_pass(Conn.t(), String.t(), String.t(), Keyword.t()) ::
      {:ok, Conn.t()}
    | {:error, :not_found | :unauthorized, Conn.t()}
  def login_by_email_and_pass(conn, email, given_pass, opts) do
    repo = Keyword.fetch!(opts, :repo)
    user = repo.get_by(Doa.Main.User, email: email)
    cond do
      user && checkpw(given_pass, user.password_hash) ->
        {:ok, login(conn, user)}
      user ->
        {:error, :unauthorized, conn}
      true ->
        dummy_checkpw()
        {:error, :not_found, conn}
    end
  end
end
