import { Polygon } from "@react-google-maps/api";

const MapPolygon = ({ coordinates, type, ...rest }) => {
  const options = {
    normal: {
      fillColor: "transparent",
      fillOpacity: 0,
      strokeColor: "#D898FF",
      strokeOpacity: 1,
      strokeWeight: 4,
    },
    selected: {
      fillColor: "#D898FF",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeOpacity: 1,
      strokeWeight: 4,
    },
    current: {
      fillColor: "#D898FF",
      fillOpacity: 0.2,
      strokeColor: "#D898FF",
      strokeOpacity: 1,
      strokeWeight: 4,
    },
  };
  return <Polygon paths={coordinates} options={options[type]} {...rest} />;
};

export default MapPolygon;
