defmodule MbtaPhoenix.PageController do
  use MbtaPhoenix.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
