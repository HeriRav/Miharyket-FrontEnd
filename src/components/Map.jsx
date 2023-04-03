import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import { Link, Route, Routes } from 'react-router-dom';

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon="mdi-light:pin" height="40" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
)

const Map = ({location, zoomLevel}) => {
    return ( 
        <>
            <title>Mihary'ket - Localisation</title>
            <div className="map">
                <Link className="text-info" to="/agriculteurs"><i className='fas fa-arrow-left'></i>&nbsp;Retour</Link>

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
        </>
     );
}
 
export default Map;