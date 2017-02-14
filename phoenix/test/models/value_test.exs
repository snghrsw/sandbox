defmodule HelloPhoenix.ValueTest do
  use HelloPhoenix.ModelCase

  alias HelloPhoenix.Value

  @valid_attrs %{value: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Value.changeset(%Value{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Value.changeset(%Value{}, @invalid_attrs)
    refute changeset.valid?
  end
end
