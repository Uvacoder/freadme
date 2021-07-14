export const get = async({params}) {
  const { encodedAddress } = params;

  const address = decodeURIComponent(encodedAddress);
}