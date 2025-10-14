// import {useMapsLibrary} from '@vis.gl/react-google-maps';
// import {
//   type ForwardedRef,
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useState
// } from 'react';
// import {useMap3DCameraEvents} from './use-map-3d-camera-events';
// import {useCallbackRef, useDeepCompareEffect} from '../../../hooks/utility-hooks';

// import './map-3d-types';

// export type Map3DProps = google.maps.maps3d.Map3DElementOptions & {
//   onCameraChange?: (cameraProps: Map3DCameraProps) => void;
// };

// export type Map3DCameraProps = {
//   center: google.maps.LatLngAltitudeLiteral;
//   range: number;
//   heading: number;
//   tilt: number;
//   roll: number;
// };

// export const Map3D = forwardRef(
//   (
//     props: Map3DProps,
//     forwardedRef: ForwardedRef<google.maps.maps3d.Map3DElement | null>
//   ) => {
//     const maps3d = useMapsLibrary('maps3d');

//     const [map3DElement, map3dRef] =
//       useCallbackRef<google.maps.maps3d.Map3DElement>();

//     useMap3DCameraEvents(map3DElement, p => {
//       if (!props.onCameraChange) return;

//       props.onCameraChange(p);
//     });

//     const [customElementsReady, setCustomElementsReady] = useState(false);
//     useEffect(() => {
//        if (!maps3d) return;
//       customElements.whenDefined('gmp-map-3d').then(() => {
//         setCustomElementsReady(true);
//       });
//     }, [maps3d]);

//     const {center, ...map3dOptions} = props;

//     useDeepCompareEffect(() => {
//       if (!map3DElement) return;

//       // copy all values from map3dOptions to the map3D element itself
//       Object.assign(map3DElement, map3dOptions);
//     }, [map3DElement, map3dOptions]);

//     useImperativeHandle<
//       google.maps.maps3d.Map3DElement | null,
//       google.maps.maps3d.Map3DElement | null
//     >(forwardedRef, () => map3DElement, [map3DElement]);

//     if (!customElementsReady || !maps3d) return null;

//     return (
//       <gmp-map-3d
//         ref={map3dRef}
//         center={center}
//         range={props.range}
//         heading={props.heading}
//         tilt={props.tilt}
//         roll={props.roll}
//         mode="HYBRID">
//             <gmp-3d-model
//               src='https://storage.googleapis.com/maps-web-api.appspot.com/gltf/windmill.glb'
//               position= {{lat: 37.76, lng: -121.63, altitude: 0}}
//               altitudeMode= 'CLAMP_TO_GROUND'
//               orientation= {{tilt: 270}}
//               scale={10}
//             >
//             </gmp-3d-model>
//       </gmp-map-3d>
//     );
//   }
// );

import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useMap3DCameraEvents } from './use-map-3d-camera-events';
import {
  useCallbackRef,
  useDeepCompareEffect,
} from '../../../hooks/utility-hooks';

import './map-3d-types';

export type Map3DProps = google.maps.maps3d.Map3DElementOptions & {
  onCameraChange?: (cameraProps: Map3DCameraProps) => void;
};

export type Map3DCameraProps = {
  center: google.maps.LatLngAltitudeLiteral;
  range: number;
  heading: number;
  tilt: number;
  roll: number;
};

// For clarity, let's keep the model's properties in a stable object.
const windmillModel = {
  src: 'https://storage.googleapis.com/maps-web-api.appspot.com/gltf/windmill.glb',
  position: { lat: 37.76, lng: -121.63, altitude: 0 },
  altitudeMode: 'CLAMP_TO_GROUND' as google.maps.maps3d.AltitudeMode, // Added type assertion for safety
  orientation: { tilt: 270 },
  scale: 10,
};

export const Map3D = forwardRef(
  (
    props: Map3DProps,
    forwardedRef: ForwardedRef<google.maps.maps3d.Map3DElement | null>
  ) => {
    const maps3d = useMapsLibrary('maps3d');

    // This part for the map element is correct and unchanged
    const [map3DElement, map3dRef] =
      useCallbackRef<google.maps.maps3d.Map3DElement>();

    // 1. Use the SAME robust useCallbackRef pattern for the model element
    const [modelElement, modelRef] =
      useCallbackRef<google.maps.maps3d.Model3DElement>();

    useMap3DCameraEvents(map3DElement, (p) => {
      if (!props.onCameraChange) return;
      props.onCameraChange(p);
    });

    const [customElementsReady, setCustomElementsReady] = useState(false);
    useEffect(() => {
      if (!maps3d) return;

      Promise.all([
        customElements.whenDefined('gmp-map-3d'),
        customElements.whenDefined('gmp-3d-model'),
      ])
        .then(() => {
          setCustomElementsReady(true);
        })
        .catch((error) => {
          console.error('Error loading Google Maps custom elements:', error);
        });
    }, [maps3d]);

    // This effect correctly handles the MAP properties
    const { center, onCameraChange, ...map3dOptions } = props;
    useDeepCompareEffect(() => {
      if (!map3DElement) return;
      Object.assign(map3DElement, map3dOptions);
    }, [map3DElement, map3dOptions]);

    // 2. This is the NEW and CORRECT effect for the MODEL
    // It runs when the modelElement is ready OR when its properties change.
    useDeepCompareEffect(() => {
      // If the modelElement isn't in the DOM yet, do nothing.
      if (!modelElement) return;

      // Set all properties directly on the DOM element.
      modelElement.src = windmillModel.src;
      modelElement.position = windmillModel.position;
      modelElement.altitudeMode = windmillModel.altitudeMode;
      modelElement.orientation = windmillModel.orientation;
      modelElement.scale = windmillModel.scale;
    }, [modelElement, windmillModel]); // Dependencies: the element and its data

    useImperativeHandle(forwardedRef, () => map3DElement, [map3DElement]);

    if (!customElementsReady || !maps3d) {
      // Returning null can sometimes be problematic during development.
      // You might want to return a placeholder div to see if the component is mounting.
      // e.g., return <div>Loading Map...</div>;
      return null;
    }

    return (
      <gmp-map-3d
        ref={map3dRef}
        // It's still a good idea to set the initial camera position via attributes
        center={center}
        range={props.range}
        heading={props.heading}
        tilt={props.tilt}
        roll={props.roll}
        mode="HYBRID"
      >
        {/* 3. Attach the callback ref and REMOVE all properties from JSX */}
        <gmp-3d-model ref={modelRef}></gmp-3d-model>
      </gmp-map-3d>
    );
  }
);

