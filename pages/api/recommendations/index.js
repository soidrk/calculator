import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const recs = await prisma.recommendation.findMany({
      include: { replies: true },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(recs);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }
    const rec = await prisma.recommendation.create({
      data: { title, content },
    });
    res.status(201).json(rec);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
