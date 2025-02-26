import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const rec = await prisma.recommendation.findUnique({
      where: { id },
      include: { replies: true },
    });
    if (!rec) {
      res.status(404).json({ error: 'Recommendation not found' });
      return;
    }
    res.status(200).json(rec);
  } else if (req.method === 'PUT') {
    // Update recommendation (for owner actions: e.g. change status)
    const { status, title, content } = req.body;
    try {
      const rec = await prisma.recommendation.update({
        where: { id },
        data: { status, title, content },
      });
      res.status(200).json(rec);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.recommendation.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
