import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // recommendation id
  if (req.method === 'POST') {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }
    const reply = await prisma.reply.create({
      data: {
        content,
        recommendation: { connect: { id } },
      },
    });
    res.status(201).json(reply);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
