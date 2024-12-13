// import { useEffect } from "react";
// import { useAppBridge } from "@shopify/app-bridge-react";
// import { Client } from "@shopify/app-bridge/actions";

// const useDynamicResize = () => {
//   const app = useAppBridge();

//   useEffect(() => {
//     if (app) {
//       const client = Client.create(app);

//       const resize = () => {
//         const newHeight = document.documentElement.scrollHeight;
//         console.log("Resizing to height:", newHeight); // Log the height for debugging
//         client.dispatch(Client.Action.RESIZE, { height: newHeight });
//       };

//       // Call resize on page load and whenever window resizes
//       resize();
//       window.addEventListener("resize", resize);

//       return () => window.removeEventListener("resize", resize);
//     }
//   }, [app]);
// };

// export default useDynamicResize;
