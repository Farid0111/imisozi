import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import '../styles/GoogleMap.css';

// Style pour la carte
const containerStyle = {
  width: '100%',
  height: '400px'
};

interface GoogleMapComponentProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  center = { lat: -1.9403, lng: 29.8739 }, // Coordonnées par défaut (Rwanda)
  zoom = 8,
  markers = []
}) => {
  // En mode développement, nous pouvons utiliser Google Maps sans clé API avec certaines restrictions
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ''
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="map-error">Erreur lors du chargement de Google Maps. Vérifiez votre clé API.</div>
  }

  return isLoaded ? (
    <div className="google-map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  ) : <div className="map-loading">Chargement de la carte...</div>
};

export default GoogleMapComponent; 