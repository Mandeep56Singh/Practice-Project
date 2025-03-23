function getDomainFromOrigin(origin: string | undefined): string | undefined {
  if (!origin) return undefined;
  try {
    return new URL(origin).hostname;
  } catch (error) {
    return undefined; // Handle invalid origin cases
  }
}
export default getDomainFromOrigin;
