import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon="mdi-light:home" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

const Map = ({location, zoomLevel}) => {
    return ( 
        <div className="map">
            <h2 className="map-h2">Rakoto</h2>

            <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyARwVublMtS5O1WfYlozRjuZIrwrgbmXss' }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
            </div>
        </div>
     );
}
 
export default Map;