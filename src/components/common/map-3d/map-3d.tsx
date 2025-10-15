import {useMapsLibrary} from '@vis.gl/react-google-maps';
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {useMap3DCameraEvents} from './use-map-3d-camera-events';
import {useCallbackRef, useDeepCompareEffect} from '../../../hooks/utility-hooks';

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

export const Map3D = forwardRef(
  (
    props: Map3DProps,
    forwardedRef: ForwardedRef<google.maps.maps3d.Map3DElement | null>
  ) => {
    const maps3d = useMapsLibrary('maps3d');
    const modelRef = useRef<google.maps.maps3d.Model3DElement| null>(null);
    const [map3DElement, map3dRef] =
      useCallbackRef<google.maps.maps3d.Map3DElement>();

    useMap3DCameraEvents(map3DElement, p => {
      if (!props.onCameraChange) return;

      props.onCameraChange(p);
    });

    const [customElementsReady, setCustomElementsReady] = useState(false);
    useEffect(() => {
       if (!maps3d) return;
      customElements.whenDefined('gmp-map-3d').then(() => {
        setCustomElementsReady(true);
      });
    }, [maps3d]);

    const {center, ...map3dOptions} = props;

    useDeepCompareEffect(() => {
      if (!map3DElement) return;

      // copy all values from map3dOptions to the map3D element itself
      Object.assign(map3DElement, map3dOptions);
    }, [map3DElement, map3dOptions]);

    useImperativeHandle<
      google.maps.maps3d.Map3DElement | null,
      google.maps.maps3d.Map3DElement | null
    >(forwardedRef, () => map3DElement, [map3DElement]);

    useEffect(() => {
  // ensure model custom element is defined too
  customElements.whenDefined('gmp-model-3d').then(() => {
    const modelEl = modelRef.current as google.maps.maps3d.Model3DElement; // specific type if you want
    console.log(modelEl);
    if (!modelEl) return;
    // set properties as JS properties (not attributes)
    modelEl.src = '/assets/models/model1.glb';
    modelEl.position = { lat: 37.76, lng: -121.63, altitude: 0 };
    modelEl.scale = 10;
    modelEl.altitudeMode = 'ABSOLUTE' 
    modelEl.orientation = { heading: 0, tilt: 0, roll: 0 };
  }).catch(err => {
    console.error('gmp-model-3d not defined:', err);
  });
}, [customElementsReady]);

    if (!customElementsReady || !maps3d) return null;

    return (
      <gmp-map-3d
        ref={map3dRef}
        center={center}
        range={props.range}
        heading={props.heading}
        tilt={props.tilt}
        roll={props.roll}
        mode="SATELLITE">
            <gmp-model-3d ref={modelRef} ></gmp-model-3d>
      </gmp-map-3d>
    );
  }
);

// import { useMapsLibrary } from "@vis.gl/react-google-maps";
// import {
//   type ForwardedRef,
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";
// import { useMap3DCameraEvents } from "./use-map-3d-camera-events";
// import {
//   useCallbackRef,
//   useDeepCompareEffect,
// } from "../../../hooks/utility-hooks";
// import "./map-3d-types";

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
//     const maps3d = useMapsLibrary("maps3d");
//     const modelRef = useRef<google.maps.maps3d.Model3DElement | null>(null);
//     const [map3DElement, map3dRef] =
//       useCallbackRef<google.maps.maps3d.Map3DElement>();
//     const [customElementsReady, setCustomElementsReady] = useState(false);

//     useMap3DCameraEvents(map3DElement, (p) => props.onCameraChange?.(p));

//     // Wait for both custom elements
//     useEffect(() => {
//       if (!maps3d) return;
//       Promise.all([
//         customElements.whenDefined("gmp-map-3d"),
//         customElements.whenDefined("gmp-model-3d"),
//       ]).then(() => setCustomElementsReady(true));
//     }, [maps3d]);

//     const { center, ...map3dOptions } = props;

//     useDeepCompareEffect(() => {
//       if (!map3DElement) return;
//       Object.assign(map3DElement, { ...map3dOptions, center });
//     }, [map3DElement, map3dOptions, center]);

//     useImperativeHandle(forwardedRef, () => map3DElement, [map3DElement]);

//     // Attach model AFTER map initializes
//     useEffect(() => {
//       if (!customElementsReady || !map3DElement) return;

//       // Create model dynamically — don’t rely on JSX child
//       const modelEl = document.createElement(
//         "gmp-model-3d"
//       ) as google.maps.maps3d.Model3DElement;

//       modelEl.src =
// "/assets/models/model1.glb";
//       modelEl.position = { lat: 37.76, lng: -121.63, altitude: 0 };
//       modelEl.scale = 100;
//       modelEl.altitudeMode = "ABSOLUTE";
//       modelEl.orientation = { heading: 0, tilt: 0, roll: 0 };

//       // append AFTER map is initialized
//       map3DElement.appendChild(modelEl);

//       console.log("✅ Model appended", modelEl);
//       modelRef.current = modelEl;

//       // cleanup
//       return () => {
//         map3DElement.removeChild(modelEl);
//       };
//     }, [customElementsReady, map3DElement]);

//     if (!customElementsReady && !maps3d && modelRef.current) return null;

//     return (
//       <gmp-map-3d
//         ref={map3dRef}
//         center={{ lat: 37.76, lng: -121.63, altitude: 100 }}
//         range={1000} // make sure camera is close enough
//         heading={props.heading}
//         tilt={props.tilt}
//         roll={props.roll}
//         mode="SATELLITE"
//       ></gmp-map-3d>
//     );
//   }
// );
