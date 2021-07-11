import { useQuery } from "@apollo/client";
import { GET_WEATHER } from "src/fetch/weather.query";
import myLayoutHOC from "src/layouts/MyLayout";

const Weather = () => {
  const { loading, error, data } = useQuery(GET_WEATHER, {
    variables: {
      city: "mumbai",
    },
  });

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <div className="f7">
      <pre> {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
const WeatherPage = myLayoutHOC(Weather);

WeatherPage.displayName = "WeatherPage";

export default WeatherPage;
