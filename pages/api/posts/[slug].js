
export async function getPostData(slug) {
  const resData = await fetch(`${process.env.API_URL}/posts/${slug}`);
  const data = await resData.json();
  return data;  
}

function handler(req, res) {
  const postSlug = req.query.slug;

  if (req.method === "POST") {
    res.status(422).json( { message: "Method not available."});
  }

  const posts = [
    {
      id: 1,
      slug: "velit-placeat-sit-ducimus-non-sed-1",
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'Gloria Roberston',
      time: '1d ago',
      datetime: '2021-01-27T16:35',
      preview:
        'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
      id: 2,
      slug: "velit-placeat-sit-ducimus-non-sed-2",
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'Gloria Roberston',
      time: '1d ago',
      datetime: '2021-01-27T16:35',
      preview:
        'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
      id: 3,
      slug: "velit-placeat-sit-ducimus-non-sed-3",
      subject: 'Velit placeat sit ducimus non sed',
      sender: 'Gloria Roberston',
      time: '1d ago',
      datetime: '2021-01-27T16:35',
      preview:
        'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    }  
    // More messages...
  ]

  const post = posts.find(
    (post) => post.slug === postSlug
  );  

  return res.status(200).json({post})
}

export default handler;