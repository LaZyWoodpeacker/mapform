import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

export default ({
  children,
  positionFrom = [55.589081, 37.417665],
  positionTo = [55.926192, 37.976657],
}) => {
  const map = useRef();
  const markerFrom = useRef(positionFrom);
  const markerTo = useRef(positionTo);
  const markerGroup = useRef(null);
  const route = useRef();
  const div = useRef();

  useEffect(() => {
    const resizeHandler = (event) => {
      debugger;
      console.log("resize");
    };
    map.current = L.map("map").setView(positionTo, 1);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 16,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map.current);

    markerFrom.current = new L.Marker(positionFrom)
      .addTo(map.current)
      .bindPopup("откуда");
    markerTo.current = new L.Marker(positionTo)
      .addTo(map.current)
      .bindPopup("куда");
    markerGroup.current = new L.featureGroup([
      markerFrom.current,
      markerTo.current,
    ]);

    route.current = L.Routing.control({
      waypoints: [positionFrom, positionTo],
      routeWhileDragging: true,
    }).addTo(map.current);

    return () => {
      div.current.removeEventListener("resize", resizeHandler);
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (positionFrom && positionFrom.length) {
      markerFrom.current.setLatLng(positionFrom).update();
    }
    if (positionTo && positionTo.length) {
      markerTo.current.setLatLng(positionTo).update();
    }
    if (
      positionFrom &&
      positionFrom.length &&
      positionTo &&
      positionTo.length
    ) {
      map.current.invalidateSize();
      route.current.setWaypoints([positionFrom, positionTo]);
      map.current.fitBounds(markerGroup.current.getBounds(), {
        padding: [50, 50],
      });
    }
  }, [positionTo, positionFrom]);

  return (
    <div className="rightRow" ref={div}>
      <div id="map"></div>
    </div>
  );
};
