import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPreview() {
  const mapContainerRef = useRef(null); // Container for the map
  const mapRef = useRef(null); // Holds the Leaflet map instance

  useEffect(() => {
    // Check if the map is already initialized
    if (mapRef.current) return;

    // Initialize the map if it's not already initialized
    mapRef.current = L.map(mapContainerRef.current).setView([30.6942, 76.8606], 13);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/dark-matter/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,
      {
        attribution: '© Geoapify',
        maxZoom: 20,
      }
    ).addTo(mapRef.current);

    const routeUrl = `https://api.geoapify.com/v1/routing?waypoints=30.7021,76.8497|30.6871,76.8785&mode=drive&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`;

    fetch(routeUrl)
      .then((res) => res.json())
      .then((result) => {
        // Ensure data is valid before processing
        const coords = result?.features?.[0]?.geometry?.coordinates[0];
        if (!coords || !Array.isArray(coords)) throw new Error('Invalid route data');

        // Transform the coordinates (note the reversal of lat/lng)
        const latlngs = coords.map(([lng, lat]) => [lat, lng]);

        // Create the polyline and add it to the map
        const polyline = L.polyline(latlngs, { color: '#0ff', weight: 5 }).addTo(mapRef.current);

        // Add Pickup and Drop-off pins
        const pickupLocation = [30.7021, 76.8497]; // Pickup coordinates
        const dropoffLocation = [30.6871, 76.8785]; // Dropoff coordinates

        const pickupPin = L.marker(pickupLocation).addTo(mapRef.current).bindPopup("Pickup Location");
        const dropoffPin = L.marker(dropoffLocation).addTo(mapRef.current).bindPopup("Drop-off Location");

        // Create driver marker with custom icon
        const driverIcon = L.icon({
          iconUrl: 'Hatchback.svg', // Use your icon URL here
          iconSize: [25, 41], // Icon size
          iconAnchor: [12, 41], // Anchor the icon at the bottom center
          popupAnchor: [1, -34], // Popup position relative to the marker
        });

        // Place the driver at a nearby location (you can adjust this coordinate)
        const driverLocation = [30.6950, 76.8600]; // Nearby driver coordinates

        const driverPin = L.marker(driverLocation, { icon: driverIcon })
          .addTo(mapRef.current)
          .bindPopup("Driver");

        // Optionally, you can adjust the map view to fit the markers and polyline
        mapRef.current.fitBounds([pickupLocation, dropoffLocation, driverLocation, ...latlngs]);

      })
      .catch((err) => {
        console.error('Route fetch error:', err);
      });

    // Cleanup the map instance on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Only runs on initial mount

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '500px', width: '90%', margin: '0 auto', borderRadius: '12px' }}
    />
  );
}
