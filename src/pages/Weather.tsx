import {  useQuery } from "@apollo/client";
import myLayoutHOC from "src/layouts/MyLayout";
import { GET_WEATHER } from "src/operations/query/weather.query";
import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const Weather = () => {
  const [city, setCity] = useState("dhaka");
  const {
    loading,
    error,
    data,
    refetch: refetchWeather,
  } = useQuery(GET_WEATHER, {
    variables: {
      city,
    },
  });

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <div className="f7">
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={(val) => {
          refetchWeather({
            city: val,
          });
        }}
      >
        <Option value="dhaka">Dhaka</Option>
        <Option value="mumbai">Mumbai</Option>
        <Option value="sylhet">Sylhet</Option>
      </Select>
      <pre> {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
const WeatherPage = myLayoutHOC(Weather);

WeatherPage.displayName = "WeatherPage";

export default WeatherPage;
