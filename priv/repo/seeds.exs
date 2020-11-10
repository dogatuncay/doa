alias Doa.Repo
alias Doa.Plant
alias Doa.User
alias Doa.Story
alias Doa.PlantInstance
alias Doa.Residence
alias Doa.Follow
alias Doa.Comment
import Ecto.Query, only: [from: 2]

defmodule Seeds do
  @moduledoc """
    mix run priv/repo/seeds.exs
  """
  @max_number_of_comments 20
  @max_depth_of_comments 5

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
    params = row
    |> convert_integer_fields([:min_frost_free_days, :min_precipitation, :max_precipitation, :min_root_depth, :min_temperature])
    |> convert_float_fields([:min_ph, :max_ph])
    struct!(Plant, params)
    |> Repo.insert!()
  end

  def generate_user_with_data(
    name: name,
    email: email,
    user_name: user_name,
    password: password,
    is_public: is_public,
    num_residences: num_residences,
    num_plants: num_plants,
    num_stories: num_stories
  ) do
    params = %{name: name, email: email, user_name: user_name, password: password, is_public: is_public}
    changeset = User.registration_changeset(%User{}, params)
    user = Repo.insert!(changeset)

    Enum.each(1..num_stories, fn _ -> generate_story(user)end)
    Enum.each(1..num_residences, fn _ -> generate_residence_w_plant_instances(user, num_plants) end)
  end

  def generate_story(user) do
    title = String.slice(Faker.Lorem.paragraph(1), 1..40)
    body = Faker.Lorem.paragraph(10)
    params = %{title: title, body: body}
    changeset =
      user
      |> Ecto.build_assoc(:stories)
      |> Story.create_changeset(params)

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
      |> Residence.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_residence} ->
        Enum.each(1..num_plants, fn _ -> generate_plant_instance(user, created_residence.id) end)
      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset.errors
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
      |> PlantInstance.create_changeset(params)

    case Repo.insert(changeset) do
      {:ok, created_plant_instance} ->
        created_plant_instance
      {:error, %Ecto.Changeset{} = changeset} ->
        changeset.errors
    end
  end

  def create_comment(story_id, user_id, parent_id) do
    body = Faker.Lorem.paragraph(1)
    params = %{parent_comment: parent_id, body: body}
    user = Repo.get(User, user_id)
    changeset =
      Repo.get(Story, story_id)
      |> Ecto.build_assoc(:comments)
      |> Comment.create_changeset(params)
      |> Ecto.Changeset.put_assoc(:user, user)

    case Repo.insert(changeset) do
      {:ok, created_comment} ->
        created_comment
      {:error, %Ecto.Changeset{} = changeset} ->
        changeset.errors
    end
  end

  def get_random_user(users), do: Enum.random(users).id

  def generate_comment_tree(users, story_id, depth, parent_id) do
    if depth != 0 do
      user_id = get_random_user(users)
      comment = create_comment(story_id, user_id, parent_id)
      generate_comment_tree(users, story_id, depth-1, comment.id)
    end
  end

  def generate_comments() do
    user_ids = Repo.all(from u in User, select: %{id: u.id})
    Repo.all(Story)
    |> Enum.each(fn story ->
      number_of_comments = Enum.random(1..@max_number_of_comments)
      depth = Enum.random(1..@max_depth_of_comments)
      IO.puts "#{inspect story.id} #{inspect number_of_comments} #{inspect depth}"
      Enum.each(1..number_of_comments, fn _ ->
        generate_comment_tree(user_ids, story.id, depth, nil)
      end)
    end)
  end

  def run do
    Repo.delete_all(PlantInstance)
    Repo.delete_all(Plant)
    Repo.delete_all(Comment)
    Repo.delete_all(Story)
    Repo.delete_all(Residence)
    Repo.delete_all(Follow)
    Repo.delete_all(User)
    Repo.delete_all(Comment)

    File.stream!("/Users/dogatuncay/Documents/practice/elixir/doa/priv/repo/data/plants.csv")
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
    |> Enum.each(&Seeds.store_plants/1)

    Seeds.generate_user_with_data(
      name: "Doga Tuncay",
      email: "doga@tuncay.com",
      user_name: "doga_tuncay",
      password: "tuncay123!",
      is_public: true,
      num_residences: 3,
      num_plants: 5,
      num_stories: 10
    )

    Seeds.generate_user_with_data(
      name: "Old McDonald",
      email: "old@mcdonald.com",
      user_name: "old_mcdonald",
      password: "mcdonald123!",
      is_public: true,
      num_residences: 1,
      num_plants: 2,
      num_stories: 5
    )

    Seeds.generate_user_with_data(
      name: "Gold McDonald",
      email: "gold@mcdonald.com",
      user_name: "gold_mcdonald",
      password: "mcdonald123!",
      is_public: false,
      num_residences: 1,
      num_plants: 9,
      num_stories: 100
    )

    Seeds.generate_user_with_data(
      name: "American Gothic",
      email: "american@gothic.com",
      user_name: "american_gothic",
      password: "gothic123!",
      is_public: false,
      num_residences: 1,
      num_plants: 6,
      num_stories: 10
    )

    Seeds.generate_comments()
  end
end

Seeds.run()
