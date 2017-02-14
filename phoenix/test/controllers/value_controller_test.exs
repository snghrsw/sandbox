defmodule HelloPhoenix.ValueControllerTest do
  use HelloPhoenix.ConnCase

  alias HelloPhoenix.Value
  @valid_attrs %{value: 42}
  @invalid_attrs %{}

  setup do
    conn = conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, value_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    value = Repo.insert! %Value{}
    conn = get conn, value_path(conn, :show, value)
    assert json_response(conn, 200)["data"] == %{"id" => value.id,
      "value" => value.value}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_raise Ecto.NoResultsError, fn ->
      get conn, value_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, value_path(conn, :create), value: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Value, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, value_path(conn, :create), value: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    value = Repo.insert! %Value{}
    conn = put conn, value_path(conn, :update, value), value: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Value, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    value = Repo.insert! %Value{}
    conn = put conn, value_path(conn, :update, value), value: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    value = Repo.insert! %Value{}
    conn = delete conn, value_path(conn, :delete, value)
    assert response(conn, 204)
    refute Repo.get(Value, value.id)
  end
end
