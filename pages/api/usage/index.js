import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return aggregated usage stats (e.g. count per page)
    const stats = await prisma.usageEvent.groupBy({
      by: ['page'],
      _count: { id: true },
    });
    res.status(200).json(stats);
  } else if (req.method === 'POST') {
    const { eventType, page } = req.body;
    if (!eventType || !page) {
      res.status(400).json({ error: 'eventType and page are required' });
      return;
    }
    const event = await prisma.usageEvent.create({
      data: { eventType, page },
    });
    res.status(201).json(event);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
