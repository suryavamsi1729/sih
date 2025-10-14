import { APIProvider} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import {Map3D, type Map3DCameraProps} from '../../components/common/map-3d';


const INITIAL_VIEW_PROPS = {
  center:{ lat: 37.76, lng: -121.63, altitude: 20 },
  range:1500,
  tilt:75,
  heading:0,
  roll:0,
};

const Map3DExample = () => {
  const [viewProps, setViewProps] = useState(INITIAL_VIEW_PROPS);

  const handleCameraChange = useCallback((props: Map3DCameraProps) => {
    setViewProps(oldProps => ({...oldProps, ...props}));
  }, []);

//   const handleMapClick = useCallback((ev: MapMouseEvent) => {
//     if (!ev.detail.latLng) return;

//     const {lat, lng} = ev.detail.latLng;
//     setViewProps(p => ({...p, center: {lat, lng, altitude: 0}}));
//   }, []);

  return (
    <>
      <Map3D
        {...viewProps}
        onCameraChange={handleCameraChange}
        defaultLabelsDisabled
      />
      {/* <MiniMap camera3dProps={viewProps} onMapClick={handleMapClick}></MiniMap> */}
    </>
  );
};



const Location: React.FC = () => {
    return(
        <APIProvider libraries={['maps3d']} apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} version='alpha'>
            <Map3DExample />
        </APIProvider>
    );
}

export  default Location;
