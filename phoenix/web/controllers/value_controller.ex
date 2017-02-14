defmodule HelloPhoenix.ValueController do
  use HelloPhoenix.Web, :controller

  alias HelloPhoenix.Value

  plug :scrub_params, "value" when action in [:create, :update]

  def index(conn, _params) do
    values = Repo.all(Value)
    render conn, "index.json", %{values: values }
  end

  def create(conn, %{"value" => value_params}) do
    changeset = Value.changeset(%Value{}, value_params)

    case Repo.insert(changeset) do
      {:ok, value} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", value_path(conn, :show, value))
        |> render("show.json", value: value)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(HelloPhoenix.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    value = Repo.get!(Value, id)
    render conn, "show.json", value: value
  end

  def update(conn, %{"id" => id, "value" => value_params}) do
    value = Repo.get!(Value, id)
    changeset = Value.changeset(value, value_params)

    case Repo.update(changeset) do
      {:ok, value} ->
        render(conn, "show.json", value: value)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(HelloPhoenix.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    value = Repo.get!(Value, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(value)

    send_resp(conn, :no_content, "")
  end
end
