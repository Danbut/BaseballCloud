const getFullName = (firstName: string, lastName: string): string =>
  `${firstName}${firstName && lastName ? ` ${lastName}` : lastName}`;

export default getFullName;
