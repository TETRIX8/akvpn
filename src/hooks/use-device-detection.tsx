
import { useEffect, useState } from "react";

type DeviceType = "ios" | "android" | "windows" | "macos" | "unknown";

export function useDeviceDetection() {
  const [device, setDevice] = useState<DeviceType>("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDevice("ios");
    } else if (/android/.test(userAgent)) {
      setDevice("android");
    } else if (/win/.test(userAgent)) {
      setDevice("windows");
    } else if (/mac/.test(userAgent)) {
      setDevice("macos");
    } else {
      setDevice("unknown");
    }
  }, []);

  return { device };
}
