// Jwt Token
const verifyJWT = (req, res, next) => 
{
    console.log("token inside verifyJWT", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("unauthorized access");
    }
    // bearer  split(" ") 
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({
                message: "forbidden access"
            });
        }
        req.decoded = decoded;
        next();
    });
}
export default verifyJWT;