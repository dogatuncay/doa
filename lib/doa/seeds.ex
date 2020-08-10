alias Doa.Repo
alias Doa.Main.Plant
alias Doa.Main.State
alias Doa.Main.User
alias Doa.Main.Story
alias Doa.Main.PlantInstance
alias Doa.Main.Residence
alias Doa.Main.Follow
import Ecto.Query, only: [from: 2]

defmodule Doa.Seeds do

  def string_to_int(value) do
    if value != "" do
      {n, _} = Integer.parse(value)
      n
    else
      nil
    end
  end

  def convert_integer_fields(row, fields) do
    Enum.reduce(fields, row, fn field, row ->
      Map.update!(row, field, &string_to_int/1)
    end)
  end

  def string_to_float(value) do
    if value != "", do: String.to_float(value), else: nil
  end

  def convert_float_fields(row, fields) do
    Enum.reduce(fields, row, fn field, row ->

      Map.update!(row, field, &string_to_float/1)
    end)
  end

  def store_plants(row) do
    params =
      row
      |> convert_integer_fields([:min_frost_free_days, :min_precipitation, :max_precipitation, :min_root_depth, :min_temperature])
      |> convert_float_fields([:min_ph, :max_ph])
    changeset = Plant.changeset(%Plant{}, params)
    Repo.insert!(changeset)
  end

  def store_states(row) do
    changeset = State.changeset(%State{}, row)
    Repo.insert!(changeset)
  end

  def generate_user_with_data(
    name: name,
    email: email,
    user_name: user_name,
    password: password,
    num_residences: num_residences,
    num_plants: num_plants,
    num_stories: num_stories
  ) do
    params = %{name: name, email: email, user_name: user_name, password: password}
    changeset = User.registration_changeset(%User{}, params)
    user = Repo.insert!(changeset)

    Enum.each(1..num_stories, fn _ -> &generate_story/1 end)
    Enum.each(1..num_residences, fn _ -> generate_residence_w_plant_instances(user, num_plants) end)
  end

  def generate_story(user) do
    title = String.slice(Faker.Lorem.paragraph(1), 1..40)
    body = String.slice(Faker.Lorem.paragraph(4), 1..250)
    params = %{title: title, body: body}
    changeset =
      user
      |> Ecto.build_assoc(:stories)
      |> Story.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_story} ->
        IO.inspect created_story
      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset.errors
    end
  end

  def generate_residence_w_plant_instances(user, num_plants) do
    title = String.slice(Faker.Lorem.paragraph(1), 1..40)
    zipcode = Faker.Address.En.zip_code()
    params = %{title: title, zipcode: zipcode}

    changeset =
      user
      |> Ecto.build_assoc(:residences)
      |> Residence.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_residence} ->
        Enum.each(1..num_plants, fn _ -> generate_plant_instance(user, created_residence.id) end)
      {:error, %Ecto.Changeset{} = changeset} ->
        changeset.errors
    end
  end

  def generate_plant_instance(user, residence_id) do
    query =
      from Plant,
      order_by: fragment("RANDOM()"),
      limit: 1

    [plant] = Repo.all(query)
    note = String.slice(Faker.Lorem.paragraph(1), 1..40)
    params = %{residence_id: residence_id, plant_id: plant.id, note: note}
    changeset =
      user
      |> Ecto.build_assoc(:plant_instances)
      |> PlantInstance.changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_plant_instance} ->
        created_plant_instance
      {:error, %Ecto.Changeset{} = changeset} ->
        changeset.errors
    end
  end

  def run do
    Repo.delete_all(PlantInstance)
    Repo.delete_all(Plant)
    Repo.delete_all(Story)
    Repo.delete_all(Residence)
    Repo.delete_all(Follow)
    Repo.delete_all(User)

    File.stream!("/Users/dogatuncay/Documents/elixir/doa/priv/repo/data/plants.csv")
    |> Stream.drop(1)
    |> CSV.decode(headers:
      [:accepted_symbol,
      :synonym_symbol,
      :scientific_name,
      :common_name,
      :plants_floristic_area,
      :state_and_province,
      :fact_sheets,
      :plant_guides,
      :characteristics_data,
      :adapted_to_coarse_soil,
      :adapted_to_medium_soil,
      :adapted_to_fine_soil,
      :anaerobic_tolerance,
      :calcium_carbonate_tolerance,
      :cold_stratification_required,
      :drought_tolerance,
      :fertility_requirement,
      :min_frost_free_days,
      :hedge_tolerance,
      :moisture_use,
      :min_ph,
      :max_ph,
      :min_precipitation,
      :max_precipitation,
      :min_root_depth,
      :salinity_tolerance,
      :shade_tolerance,
      :min_temperature])
    |> Enum.each(&Doa.Seeds.store_plants/1)

    File.stream!("/Users/dogatuncay/Documents/elixir/doa/priv/repo/data/states.csv")
      |> Stream.drop(1)
      |> CSV.decode(headers: [:state, :stateAbbreviation])
      |> Enum.each(&Doa.Seeds.store_states/1)


    Doa.Seeds.generate_user_with_data(
      name: "Doga Tuncay",
      email: "doga@tuncay.com",
      user_name: "doga_tuncay",
      password: "tuncay123!",
      num_residences: 3,
      num_plants: 5,
      num_stories: 10
    )

    Doa.Seeds.generate_user_with_data(
      name: "Old McDonald",
      email: "old@mcdonald.com",
      user_name: "old_mcdonald",
      password: "mcdonald123!",
      num_residences: 1,
      num_plants: 2,
      num_stories: 5
    )

    Doa.Seeds.generate_user_with_data(
      name: "Gold McDonald",
      email: "gold@mcdonald.com",
      user_name: "gold_mcdonald",
      password: "mcdonald123!",
      num_residences: 1,
      num_plants: 9,
      num_stories: 100
    )

    Doa.Seeds.generate_user_with_data(
      name: "American Gothic",
      email: "american@gothic.com",
      user_name: "american_gothic",
      password: "gothic123!",
      num_residences: 1,
      num_plants: 6,
      num_stories: 10
    )
  end
end
