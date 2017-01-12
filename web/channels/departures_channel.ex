defmodule MbtaPhoenix.DeparturesChannel do
    use Phoenix.Channel
    def join("departures:main", message, socket) do
        departures  = get_departures
        if socket.assigns.auth == 'master' do
            :timer.send_interval(5000, :update_departures)
        end
        {:ok, departures, socket}
    end
    def join("rooms:" <> _private_subtopic, _message, _socket) do
        {:error, %{reason: "unauthorized"}}
    end    
    def save_departures do
        %HTTPotion.Response{body: body} = HTTPotion.get "http://developer.mbta.com/lib/gtrtfs/Departures.csv"
        File.touch('./priv/csv/departures.csv')
        File.write('./priv/csv/departures.csv', body)
    end
    def get_departures do
        list = File.stream!("./priv/csv/departures.csv") |> CSV.decode(headers: true) |> Enum.to_list
        %{data: list}
    end
    def handle_info(:update_departures, socket) do
        save_departures
        broadcast! socket, "update_departure", get_departures
        {:noreply, socket}
    end
end