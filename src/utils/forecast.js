const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8deada86ac0b9cd7bfb7a333e15c6184&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    const regex = /(-?)\d{1,5}.?\d{0,4}/;

    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (!(regex.test(lng) && regex.test(lat))) {
      callback(
        'Unable to find location. Please provide a valid location.',
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. There is a humidity of ${body.current.humidity} %`
      );
    }
  });
};

module.exports = forecast;
