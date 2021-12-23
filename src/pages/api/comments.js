import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const result = await axios.post(
        "https://blog.evanagee.com/wp-json/wp/v2/comments",
        {
          ...req.body
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
      const data = await result.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(200).json({error: error?.response?.data});
    }
  }

  return res.status(200).json({});
}
