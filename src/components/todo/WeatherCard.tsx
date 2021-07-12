import { Card } from "antd";
import _ from "lodash";
import moment from "moment";
import {
  GetWeather_weathers_current,
  GetWeather_weathers_daily,
} from "src/operations/query/generatedType/GetWeather";

const TempratureView = ({ temp }: { temp: any }) =>
  _.isString(temp) ? (
    <td> {temp} °C </td>
  ) : (
    <td>
      {_.map(temp, (value, key) => (
        <span className="flex mh1 ">
          {key}: {value} °C ,
        </span>
      ))}
    </td>
  );

const WeatherCard = ({
  clouds,
  temp,
  humidity,
  feels_like,
  dt,
  today = false,
  className,
}: (GetWeather_weathers_current | GetWeather_weathers_daily) & {
  today?: boolean;
  className?: string;
  temp: any;
  feels_like: any;
}) => {
  return (
    <Card className={className}>
      <span className="f2 db">
        {today
          ? "Weather of Today"
          : `${moment((dt || 0) * 1000).format("MMMM Do YYYY")}`}
      </span>
      <table className="table w-100 tl">
        <tbody>
          <tr>
            <th className="w-20 pv2 v-top">Clouds</th>
            <td className="w-50">{clouds}%</td>
          </tr>
          <tr>
            <th className="w-20 pv2 v-top">Temparature</th>
            <TempratureView temp={temp} />
          </tr>
          <tr>
            <th className="w-20 pv2 v-top">Feels Like</th>
            {<TempratureView temp={feels_like} />}
          </tr>
          <tr>
            <th className="w-20 pv2 v-top">Humidity</th>
            <td>{humidity} %</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default WeatherCard;
