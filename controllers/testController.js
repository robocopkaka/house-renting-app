// can be deleted later. Just need for proof of concept

export function get(req, res) {
  console.log(req.body);
  res.json({
    "message": "Buenos"
  })
}
