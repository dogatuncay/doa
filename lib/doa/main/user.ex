defmodule Doa.Main.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :user_name, :email]}
  schema "users" do
    field :name, :string
    field :user_name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    has_many :residences, Doa.Main.Residence
    has_many :plant_instances, Doa.Main.PlantInstance

    timestamps()
  end

  def registration_changeset(user, params) do
    user
    |> changeset(params)
    |> password_changeset(params)
  end

  def password_changeset(user, params) do
    fields = [:password]
    user
    |> cast(params, fields)
    |> validate_required(fields)
    |> validate_length(:password, min: 6)
    |> validate_format(:password, ~r/[0-9]+/, message: "Password must contain a number")
    |> validate_format(:password, ~r/[a-z]+/, message: "Password must contain a lower-case letter")
    # |> validate_format(:password, ~r/[A-Z]+/, message: "Password must contain an upper-case letter")
    |> validate_format(:password, ~r/[#\!\?&@\$%^&*\(\)]+/, message: "Password must contain a symbol")
    |> put_password_hash()
  end

  def changeset(user, params \\ %{}) do
    fields = [:email, :name, :user_name]
    user
    |> cast(params, fields)
    |> validate_required(fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:user_name, min: 6, max: 20)
    |> unique_constraint([:email, :user_name])
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ -> changeset
    end
  end
end
