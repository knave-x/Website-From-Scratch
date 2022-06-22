import "./IssMapStyles.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

import React, { useEffect, useState, useRef } from "react";

import { Marker } from "./Marker";
import axios from "axios";
import { Polyline } from "@react-google-maps/api";

// const render = (status) => {
//     return <h1>{status}</h1>;
//   };

const IssMap = (props) => {
  // [START maps_react_map_component_app_state]
  const [satellite, setSatellite] = useState(null);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [line, setLine] = useState([]);
  
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (satellite) {
      setLine([
        ...line,
        {
          lat: parseFloat(satellite.iss_position.latitude),
          lng: parseFloat(satellite.iss_position.longitude),
        },
      ]);

      localStorage.setItem("lines", JSON.stringify([...line, {
        lat: parseFloat(satellite.iss_position.latitude),
        lng: parseFloat(satellite.iss_position.longitude),
      }]))
    }
  }, [satellite]);

  useEffect(() => {
    
    const stringData = localStorage.getItem('lines');

    if(stringData) {
        console.log("here");
        const temp = JSON.parse(stringData);
        setLine([...line,...temp])
    }
  }, []);

  const onIdle = (m) => {
    //   setZoom(m.getZoom());
    //   setCenter(m.getCenter().toJSON());
  };
  const getData = async () => {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then(function (response) {
        setSatellite(response.data);
        console.log("daily satellite: ", response);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    setInterval(() => {
      getData();
    }, 7000);
    getData();
  }, []);

  return (
    <div className="isscolor">
      <div style={{ display:"flex", height: "800px", width: "800px" }}> 
      
        
        <Wrapper
          apiKey={"AIzaSyCfy-kvoje4j91sQ_ARMpol5sZa7j8XatE"}
       
        >
          <Map
            center={center}
            onIdle={onIdle}
            zoom={zoom}
            style={{flexGrow:"1 ", height: "100%" }}
          >
            {satellite && (
              <Marker
                icon={
                  "https://img.freepik.com/free-vector/satellite-icon-grey-blue_67515-100.jpg?w=20"
                }
                position={{
                  lat: parseFloat(satellite.iss_position.latitude),
                  lng: parseFloat(satellite.iss_position.longitude),
                }}
              />
            )}

            <Polyline path={line} />
          </Map>
        </Wrapper>
      </div>
    </div>  
    
  );
  // [END maps_react_map_component_app_return]
};

const Map = ({ onIdle, children, style, ...options }) => {
  // [START maps_react_map_component_add_map_hooks]
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      console.log("içine giriyor mu : ");
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  // [END maps_react_map_component_add_map_hooks]

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]

  // [START maps_react_map_component_event_hooks]
  useEffect(() => {
    if (onIdle && map) {
      map.addListener("idle", () => onIdle(map));
    }
  }, [map, onIdle]);
  // [END maps_react_map_component_event_hooks]

  // [START maps_react_map_component_return]
  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(
      new window.google.maps.LatLng(b)
    );
  }

  // TODO extend to other types

  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default IssMap;
