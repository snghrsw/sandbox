defmodule HelloPhoenix.ValueView do
  use HelloPhoenix.Web, :view

  def render("index.json", %{values: values}) do
    %{data: render_many(values, HelloPhoenix.ValueView, "value.json")}
    # %{value: 1}
  end

  def render("show.json", %{value: value}) do
    %{data: render_one(value, HelloPhoenix.ValueView, "value.json")}
  end

  def render("value.json", %{value: value}) do
    %{id: value.id,
      value: value.value}
  end
end
