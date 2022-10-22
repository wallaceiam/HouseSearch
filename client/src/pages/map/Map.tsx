import React, { useContext, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { EducationContext } from "./components/EducationProvider";
import { MapContext } from "./components/MapProvider";
import { mapLoaded, moveView } from "./stores/map";
import { useGeoJson } from "./stores/education";
import Popup from "./components/SchoolPopup";
import { createRoot } from "react-dom/client";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9vZGllc3QiLCJhIjoiY2w5OGVqeDl4MDJleTNzbzZxdnkwYTVsNyJ9.s8lqHyzpt5ymoSmDVlQYwA";

const Map = () => {
  const { state: mapState, dispatch: mapDispatch } = useContext(MapContext)!;
  const { state } = useContext(EducationContext)!;

  const mapContainer = useRef(null);
  const popUpRef = useRef(
    new mapboxgl.Popup({
      closeButton: false,
      className: "popup",
    })
  );
  const map = useRef<mapboxgl.Map | null>(null);

  const { ofstedGeoJson } = useGeoJson(state);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [mapState.long, mapState.lat],
      zoom: mapState.zoom,
      minZoom: 9,
    });
    const cur = map.current;
    cur.on("load", () => {
      cur.loadImage("/imgs/academic-cap.png", (error, image) => {
        if (error) throw error;
        cur.addImage("ofsted-icon", image!, { sdf: true });
        cur.addSource("ofsted", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        cur.addLayer({
          id: "ofsted-symbol",
          source: "ofsted",
          type: "symbol",
          layout: {
            "icon-image": "ofsted-icon",
            "icon-size": 0.75,
            // "text-field": ["get", "name"],
          },
          paint: {
            "icon-color": [
              "match", // Use the 'match' expression: https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              ["get", "rating"], 
              1,
              "#4ade80",
              2,
              "#f59f0b",
              3,
              "#374151",
              4,
              "#f87171",
              "#000000",
            ]
          },
        });

        cur.on(
          "click",
          "ofsted-symbol",
          (
            e: mapboxgl.MapMouseEvent & {
              features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
            } & mapboxgl.EventData
          ) => {
            if (e === undefined) {
              return;
            }

            const { features } = e!;
            // Copy coordinates array.
            const coordinates = (
              features![0].geometry as any
            ).coordinates.slice();
            const school = features![0].properties as any;

            const popupNode = document.createElement("div");
            const root = createRoot(popupNode!); // createRoot(container!) if you use TypeScript
            root.render(<Popup ref={popUpRef.current} school={school} />);
            

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popUpRef.current
              .setLngLat(coordinates)
              .setDOMContent(popupNode)
              .addTo(cur);
          }
        );

        cur.on("mouseenter", "ofsted-symbol", () => {
          cur.getCanvas().style.cursor = "pointer";
        });

        cur.on("mouseleave", "ofsted-symbol", () => {
          cur.getCanvas().style.cursor = "";
        });
        
        /*
        cur!.addSource("stations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        cur!.addSource("ideal", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        cur!.addLayer({
          id: "ideal-fill",
          type: "fill",
          source: "ideal",
          paint: {
            "fill-color": "#e2e2e2",
            "fill-opacity": 0.4,
          },
        });

        cur!.addLayer({
          id: "ideal-line",
          type: "line",
          source: "ideal",
          paint: {
            "line-color": "#2e2e2e",
            "line-opacity": 0.4,
            "line-width": 2,
          },
        });

        cur!.addLayer({
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

        cur!.addLayer(
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
        );*/

        mapDispatch(mapLoaded());
      });
    });
  });

  useEffect(() => {
    const cur = map.current;
    if (cur === null) return; // wait for map to initialize
    cur.on("move", () => {
      mapDispatch(
        moveView({
          long: +cur.getCenter().lng.toFixed(4),
          lat: +cur.getCenter().lat.toFixed(4),
          zoom: +cur.getZoom().toFixed(2),
        })
      );
    });
  }, [map, mapDispatch]);

  useEffect(() => {
    if (!mapState.hasMapLoaded) return;
    if (map.current === null) return; // wait for map to initialize
    const source = map.current!.getSource("ofsted") as any;
    source?.setData(ofstedGeoJson);
  }, [map, mapState.hasMapLoaded, ofstedGeoJson]);

  // useEffect(() => {
  //   if (!mapState.hasMapLoaded) return;
  //   if (map.current === null) return; // wait for map to initialize
  //   const source = map.current!.getSource("stations") as any;
  //   source?.setData(stationGeoJson);
  // }, [map, mapState.hasMapLoaded, stationGeoJson]);

  return <div ref={mapContainer} className="h-screen" />;
};

export default Map;
