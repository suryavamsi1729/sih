// /* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */

// import {type DOMAttributes,type RefAttributes} from 'react';

// // add an overload signature for the useMapsLibrary hook, so typescript
// // knows what the 'maps3d' library is.
// declare module '@vis.gl/react-google-maps' {
//   export function useMapsLibrary(
//     name: 'maps3d'
//   ): typeof google.maps.maps3d | null;
// }

// // temporary fix until @types/google.maps is updated with the latest changes
// declare global {
//   namespace google.maps.maps3d {
//     interface Map3DElement extends HTMLElement {
//       mode?: 'HYBRID' | 'SATELLITE';
//     }
//   }
// }

// // add the <gmp-map-3d> custom-element to the JSX.IntrinsicElements
// // interface, so it can be used in jsx
// declare module 'react' {
//   namespace JSX {
//     interface IntrinsicElements {
//       ['gmp-map-3d']: CustomElement<
//         google.maps.maps3d.Map3DElement,
//         google.maps.maps3d.Map3DElement
//       >;
//     }
//   }
// }

// // a helper type for CustomElement definitions
// type CustomElement<TElem, TAttr> = Partial<
//   TAttr &
//     DOMAttributes<TElem> &
//     RefAttributes<TElem> & {
//       // for whatever reason, anything else doesn't work as children
//       // of a custom element, so we allow `any` here
//       children: any;
//     }
// >;



// eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */

// import { type DOMAttributes, type RefAttributes } from "react";

// /**
//  * Make TypeScript recognize the 'maps3d' library in useMapsLibrary
//  */
// declare module "@vis.gl/react-google-maps" {
//   export function useMapsLibrary(
//     name: "maps3d"
//   ): typeof google.maps.maps3d | null;
// }

// /**
//  * Extend the Google Maps 3D typings.
//  * This allows use of Map3DElement, Model3DElement, and MapMode
//  * until @types/google.maps officially supports them.
//  */
// declare global {
//   namespace google.maps.maps3d {
//     interface Map3DElementOptions {
//       center?: google.maps.LatLngAltitudeLiteral;
//       heading?: number;
//       tilt?: number;
//       roll?: number;
//       mode?: "HYBRID" | "SATELLITE";
//     }

//     interface Model3DElementOptions {
//       src: string;
//       position?: google.maps.LatLngAltitudeLiteral;
//       altitudeMode?: string;
//       orientation?: {
//         heading?: number;
//         tilt?: number;
//         roll?: number;
//       };
//       scale?: number;
//     }

//     class Map3DElement extends HTMLElement {
//       constructor(options: Map3DElementOptions);
//     }

//     class Model3DElement extends HTMLElement {
//       constructor(options: Model3DElementOptions);
//     }

//     enum MapMode {
//       SATELLITE = "SATELLITE",
//       HYBRID = "HYBRID",
//     }
//   }
// }

// /**
//  * Augment React JSX so you can use <gmp-map-3d> and <gmp-3d-model>
//  */
// declare module "react" {
//   namespace JSX {
//     interface IntrinsicElements {
//       ["gmp-map-3d"]: CustomElement<
//         google.maps.maps3d.Map3DElement,
//         google.maps.maps3d.Map3DElement
//       >;
//       ["gmp-3d-model"]: CustomElement<
//         google.maps.maps3d.Model3DElement,
//         google.maps.maps3d.Model3DElement
//       >;
//     }
//   }
// }

// /**
//  * Shared helper type for defining CustomElements
//  */
// type CustomElement<TElem, TAttr> = Partial<
//   TAttr &
//     DOMAttributes<TElem> &
//     RefAttributes<TElem> & {
//       children?: any;
//     }
// >;


/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import { type DOMAttributes, type RefAttributes } from 'react';

// Declare for @vis.gl/react-google-maps
declare module '@vis.gl/react-google-maps' {
  export function useMapsLibrary(
    name: 'maps3d'
  ): typeof google.maps.maps3d | null;
}

// ---- Add missing Google Maps 3D Model types ----
declare global {
  namespace google.maps.maps3d {
    interface Map3DElementOptions {
      center?: google.maps.LatLngAltitudeLiteral|null;
      heading?: number|null;
      tilt?: number|null;
      roll?: number|null;
      mode?: 'HYBRID' | 'SATELLITE';
      range?: number|null;
    }

    interface Model3DElementOptions {
      src: string;
      position?: google.maps.LatLngAltitudeLiteral;
      altitudeMode?: string;
      orientation?: { heading?: number; tilt?: number; roll?: number };
      scale?: number;
    }

    // class Map3DElement extends HTMLElement {
    //   constructor(options: Map3DElementOptions);
    // }

    class Model3DElement extends HTMLElement {
      constructor(options: Model3DElementOptions);
    }
  }
}

// ---- Tell React about <gmp-map-3d> and <gmp-3d-model> ----
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ['gmp-map-3d']: CustomElement<
        google.maps.maps3d.Map3DElement,
        google.maps.maps3d.Map3DElement
      >;
      ['gmp-3d-model']: CustomElement<
        google.maps.maps3d.Model3DElement,
        google.maps.maps3d.Model3DElementOptions
      >;
    }
  }
}

// Helper type
type CustomElement<TElem, TAttr> = Partial<
  TAttr &
    DOMAttributes<TElem> &
    RefAttributes<TElem> & {
      children?: any;
    }
>;
