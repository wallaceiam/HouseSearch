import React, { useContext, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Context } from "./Provider";
import { mapLoaded, moveView, useGeoJson } from "../store";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9vZGllc3QiLCJhIjoiY2w5OGVqeDl4MDJleTNzbzZxdnkwYTVsNyJ9.s8lqHyzpt5ymoSmDVlQYwA";

const Map = () => {
  const { state, dispatch } = useContext(Context)!;

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { ofstedGeoJson, stationGeoJson } = useGeoJson(state);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [state.long, state.lat],
      zoom: state.zoom,
    });
    map.current.on("load", () => {
      map.current!.addSource("ofsted", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current!.addSource("stations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current!.addSource("ideal", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current!.addLayer({
        id: "ideal-fill",
        type: "fill",
        source: "ideal",
        paint: {
          "fill-color": "#e2e2e2",
          "fill-opacity": 0.4,
        },
      });

      map.current!.addLayer({
        id: "ideal-line",
        type: "line",
        source: "ideal",
        paint: {
          "line-color": "#2e2e2e",
          "line-opacity": 0.4,
          "line-width": 2,
        },
      });

      map.current!.addLayer({
        id: "ofsted-name",
        type: "symbol",
        source: "ofsted",
        minzoom: 14,
        layout: {
          "text-field": ["get", "name"],
        },
        paint: {
          "text-color": "#f08",
          "text-opacity": 0.4,
        },
      });

      map.current!.addLayer(
        {
          id: "ofsted-circle",
          type: "circle",
          source: "ofsted",
          layout: {},
          paint: {
            "circle-color": "#f08",
            "circle-opacity": 0.4,
            "circle-radius": 2,
          },
        },
        "ofsted-name"
      );

      map.current!.addLayer({
        id: "station-name",
        type: "symbol",
        source: "stations",
        minzoom: 14,
        layout: {
          "text-field": ["get", "station"],
        },
        paint: {
          "text-color": "#80F",
          "text-opacity": 0.4,
        },
      });

      map.current!.addLayer(
        {
          id: "station-circle",
          type: "circle",
          source: "stations",
          layout: {},
          paint: {
            "circle-color": "#80F",
            "circle-opacity": 0.4,
            "circle-radius": 2,
          },
        },
        "station-name"
      );

      dispatch(mapLoaded());
    });
  });

  useEffect(() => {
    const cur = map.current;
    if (cur === null) return; // wait for map to initialize
    cur.on("move", () => {
      dispatch(
        moveView({
          long: +cur.getCenter().lng.toFixed(4),
          lat: +cur.getCenter().lat.toFixed(4),
          zoom: +cur.getZoom().toFixed(2),
        })
      );
    });
  }, [map, dispatch]);

  useEffect(() => {
    if (!state.mapLoaded) return;
    if (map.current === null) return; // wait for map to initialize
    const source = map.current!.getSource("ofsted") as any;
    source?.setData(ofstedGeoJson);
  }, [map, state.mapLoaded, ofstedGeoJson]);

  useEffect(() => {
    if (!state.mapLoaded) return;
    if (map.current === null) return; // wait for map to initialize
    const source = map.current!.getSource("stations") as any;
    source?.setData(stationGeoJson);
  }, [map, state.mapLoaded, stationGeoJson]);

  return <div ref={mapContainer} className="h-screen" />;
};

export default Map;
