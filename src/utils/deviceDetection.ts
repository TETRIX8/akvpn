
type DeviceType = "ios" | "android" | "windows" | "macos" | "unknown";

export function detectDeviceType(): DeviceType {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "ios";
  }
  
  // Android detection
  if (/android/i.test(userAgent)) {
    return "android";
  }
  
  // Windows detection
  if (/Windows NT/.test(userAgent)) {
    return "windows";
  }
  
  // macOS detection
  if (/Mac OS X/.test(userAgent) && !/iPad|iPhone|iPod/.test(userAgent)) {
    return "macos";
  }
  
  return "unknown";
}

export function getRecommendedApp(deviceType: DeviceType): string {
  switch (deviceType) {
    case "ios":
    case "macos":
      return "streisand";
    case "android":
      return "v2raytun";
    case "windows":
      return "hiddify";
    default:
      return "streisand"; // Default recommendation
  }
}

export function getDeviceDisplayName(deviceType: DeviceType): string {
  switch (deviceType) {
    case "ios":
      return "iOS";
    case "macos":
      return "macOS";
    case "android":
      return "Android";
    case "windows":
      return "Windows";
    default:
      return "Ваше устройство";
  }
}
