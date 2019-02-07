
export const getRecs = () =>
  fetch(`https://api.foursquare.com/v2/venues/explore?client_id=5QPZCCKZWMKID3DBRX53QKJQCGSAIVBZX3YLGV3B1PUXHRXS&client_secret=AR1D0SSWSWKQAMXYOJWFE3NR4UO34Z4KFFYQ0NSFCREEBV3G&v=20190203&near=Chicago,IL`)
    .then(res=> res.json())
    .then(data => data.response.groups[0].items);

export const getVenueDetails = (venueId) =>
  fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=5QPZCCKZWMKID3DBRX53QKJQCGSAIVBZX3YLGV3B1PUXHRXS&client_secret=AR1D0SSWSWKQAMXYOJWFE3NR4UO34Z4KFFYQ0NSFCREEBV3G&v=20190203`)
  .then(res => res.json())
  .then(data => data.response.venue);
