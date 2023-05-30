export function ConvertToJSDateTime(serverDate: Date | string) {
  return typeof serverDate === 'string' ? new Date(serverDate) : serverDate;
}
