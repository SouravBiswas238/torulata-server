import requestIp from 'request-ip'
import geoip from 'geoip-lite'
import useragent from 'useragent'

export const requestIp = (req, res, next) => {
    const ip = req.clientIp;
    const geo = geoip.lookup(ip);
    const agent = useragent.parse(req.headers['user-agent']);

    req.ipAddress = ip;
    req.deviceName = agent.device.toString();
    req.location = geo;

    next();
};
