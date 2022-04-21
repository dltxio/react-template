export const shortenAddress = (address: string) => {
  return `${address.toString().substring(0, 6)}...${address
    .toString()
    .substring(36)}`;
};
