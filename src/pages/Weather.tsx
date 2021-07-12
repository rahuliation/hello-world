import { useQuery } from "@apollo/client";
import myLayoutHOC from "src/layouts/MyLayout";
import { GET_WEATHER } from "src/operations/query/weather.query";
import { Select, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { cities } from "src/operations/cities";
import { getDistance } from "src/utils/helper";
import {
  GetWeather,
  GetWeatherVariables,
} from "src/operations/query/generatedType/GetWeather";
import WeatherCard from "src/components/todo/WeatherCard";

const { Option } = Select;

const defaultCord = {
  city: "Dhaka",
  lat: 23.7231,
  lng: 90.4086,
  country: "Bangladesh",
  population: 12797394,
};

const Weather = () => {
  const [city, setCity] = useState(defaultCord);

  const {
    loading,
    error,
    data,
    refetch: refetchWeather,
  } = useQuery<GetWeather, GetWeatherVariables>(GET_WEATHER, {
    variables: {
      lat: city.lat,
      lon: city.lng,
    },
  });

  useEffect(() => {
    refetchWeather({
      lat: city.lat,
      lon: city.lng,
    });
  }, [city, refetchWeather]);

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords) {
          const cityData = cities.reduce<{ distance: number; city?: string }>(
            (state, cityData) => {
              const { longitude, latitude } = position.coords;
              const distance = getDistance(
                cityData.lat,
                cityData.lng,
                latitude,
                longitude,
                "K"
              );
              const minDistance = Math.min(distance, state.distance);
              return minDistance === distance
                ? { ...cityData, distance }
                : state;
            },
            { distance: Number.MAX_SAFE_INTEGER }
          );
          if (cityData.city) {
            setCity(cityData as any);
          }
        }
      });
    }
  }, []);

  const dailyStatus = data?.weathers?.daily ?? [];
  const current = data?.weathers?.current;

  if (error) return <>Error! ${error.message}</>;

  return (
    <div className="f7 h-100">
      <span className="db f1 lh-title bb mb4">Weather APP</span>
      <div className="w-100 pv4 flex">
        <span className="w-20 b f4">Search City:</span>
        <Select
          defaultValue={JSON.stringify(city)}
          optionFilterProp="children"
          showSearch
          size="large"
          className="w-100"
          placeholder=" Select A City"
          onChange={(val) => {
            setCity(JSON.parse(val));
          }}
          filterOption={(input, option: any) =>
            option.children.join().toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {cities.map((city, key) => (
            <Option key={key} value={JSON.stringify(city)}>
              {city.city} {city.country}
            </Option>
          ))}
        </Select>
      </div>

      {loading && (
        <Space size="large" className="h-100 flex justify-center pa4">
          <Spin size="large" />
        </Space>
      )}
      {data?.weathers && (
        <>
          <span className="f3 fw8 db pv2">Current Weather</span>
          {current && (
            <div className="fl w-100 pa2">
              <WeatherCard
                className="bg-washed-blue"
                today={true}
                {...current}
              />
            </div>
          )}
          <span className="f3 fw8 db pv2">7 Days Forecast</span>
          {dailyStatus.map((day: any, key) => (
            <div key={key} className="bg-washed-green fl pa2 w-100 w-50-l">
              <WeatherCard {...day} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
const WeatherPage = myLayoutHOC(Weather);

WeatherPage.displayName = "WeatherPage";

export default WeatherPage;
