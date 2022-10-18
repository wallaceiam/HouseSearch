import React, { useContext, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Context } from "./components/Provider";
import { mapLoaded, moveView, useGeoJson } from "../../store";
import Popup from "./components/SchoolPopup";
import { createRoot } from "react-dom/client";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9vZGllc3QiLCJhIjoiY2w5OGVqeDl4MDJleTNzbzZxdnkwYTVsNyJ9.s8lqHyzpt5ymoSmDVlQYwA";

const Map = () => {
  const { state, dispatch } = useContext(Context)!;

  const mapContainer = useRef(null);
  const popUpRef = useRef(
    new mapboxgl.Popup({
      closeButton: false,
      className: "popup",
    })
  );
  const map = useRef<mapboxgl.Map | null>(null);

  const { ofstedGeoJson, stationGeoJson } = useGeoJson(state);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/mapbox/light-v10",
      center: [state.long, state.lat],
      zoom: state.zoom,
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
            "icon-size": 0.5,
            // "text-field": ["get", "name"],
          },
          // paint: {
          //   "text-opacity": 0.4,
          // },
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
            const { name, webLink } = features![0].properties as any;

            const popupNode = document.createElement("div");
            const root = createRoot(popupNode!); // createRoot(container!) if you use TypeScript
            root.render(<Popup name={name} webLink={webLink} ref={popUpRef.current} />);
            

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
        );

        dispatch(mapLoaded());
      });
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
