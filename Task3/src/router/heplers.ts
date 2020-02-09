export const defaultErrorHandler = (req, res) => {
    res.status(500).json(req);
    console.log(req);
}