function parseTimeToMs(time: string): number {
  const unit = time.slice(-1); // Get last character (m, h, d)
  const value = parseInt(time.slice(0, -1), 10); // Get numeric part

  if (isNaN(value)) throw new Error(`Invalid time format: ${time}`);

  switch (unit) {
    case "s":
      return value * 1000; // Convert seconds to ms
    case "m":
      return value * 60 * 1000; // Convert minutes to ms
    case "h":
      return value * 60 * 60 * 1000; // Convert hours to ms
    case "d":
      return value * 24 * 60 * 60 * 1000; // Convert days to ms
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
}
export default parseTimeToMs
