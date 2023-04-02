import Map from "../components/Map";
// import '../css/map.css';

const Mapping = () => {

  const location = {
      address: 'Antsirabe',
      lat:  -19.873874,
      lng:  47.031963
    } 

  return ( 
      <Map location={location} zoomLevel={15} />
  );
}
 
export default Mapping;