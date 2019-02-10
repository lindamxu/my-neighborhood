
export const getRecs = () =>
  fetch(`https://api.foursquare.com/v2/venues/explore?client_id=5QPZCCKZWMKID3DBRX53QKJQCGSAIVBZX3YLGV3B1PUXHRXS&client_secret=MHMBOCIX100QX5OEYA5N4HZIAH114LEBJ2FM4HDYA4WTROA3&v=20190203&limit=5&near=Chicago,IL`)
    .then(res=> res.json())
    .then(data => data.response.groups[0].items);

export const getVenueDetails = (venueId) =>
  fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=J00XRIYDHMRAF3NC4VIIHQ2HKPAGZMPL5SX15NYS2MMTU5QZ&client_secret=I3H3UHVU15UP0XR2KHEXE4AWXOU0FWNGCINGPY2SLWEML2W5&v=20190203`)
  .then(res => res.json())
  .then(data => data.response.venue);


//my original code:
//client_id=5QPZCCKZWMKID3DBRX53QKJQCGSAIVBZX3YLGV3B1PUXHRXS&client_secret=MHMBOCIX100QX5OEYA5N4HZIAH114LEBJ2FM4HDYA4WTROA3
