defmodule MbtaPhoenix.DeparturesAuthChannelTest do
    use MbtaPhoenix.ChannelCase
    alias MbtaPhoenix.DeparturesChannel
  setup do
    {:ok, _, socket} =
      socket("auth", %{auth: 'master'})
        |> subscribe_and_join(DeparturesChannel, "departures:main")
    {:ok, socket: socket}
  end
    test "It should broadcast departures If authorized", %{socket: socket} do
        assert_broadcast("update_departure", %{data: _}, 10000)
    end
end

defmodule MbtaPhoenix.DeparturesNonAuthChannelTest do
    use MbtaPhoenix.ChannelCase
    alias MbtaPhoenix.DeparturesChannel
  setup do
    {:ok, _, socket} =
      socket("auth", %{auth: nil})
        |> subscribe_and_join(DeparturesChannel, "departures:main")
    {:ok, socket: socket}
  end
    test "It should not broadcast departures If unauthorized", %{socket: socket} do
        refute_broadcast("update_departure", %{data: _}, 10000)
    end
end