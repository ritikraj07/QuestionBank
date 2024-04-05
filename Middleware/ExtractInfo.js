const geoip = require('geoip-lite');

const ExtractInfo = (req, res, next) => {
    // Extracting information from the request object
    const { headers, method, url, params, query, body, ip } = req;

    // Extracting specific information if needed
    const userAgent = headers['user-agent'];
    const requestId = headers['x-request-id'];
    const userId = req.user ? req.user.id : null;

    // Logging extracted information
    console.log('Request Method:', method);
    console.log('Request URL:', url);
    console.log('Request Headers:', headers);
    console.log('Request Params:', params);
    console.log('Query Parameters:', query);
    console.log('Request Body:', body);
    console.log('User Agent:', userAgent);
    console.log('Request ID:', requestId);
    console.log('User ID:', userId);
    console.log('Client IP Address:', ip); // Track client's IP address

    // Extracting the client's IP address from the x-forwarded-for header
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Perform IP geolocation lookup
    const geo = geoip.lookup(ipAddress);

    // Display the geographical information
    console.log('Geographical Address:');
    console.log('City:', geo?.city);
    console.log('Region:', geo?.region);
    console.log('Country:', geo?.country);
    console.log('Latitude:', geo?.ll[0]);
    console.log('Longitude:', geo?.ll[1]);

    // Proceed to the next middleware function
    next();
}

module.exports = ExtractInfo;
