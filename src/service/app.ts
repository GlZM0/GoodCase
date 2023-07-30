// @ts-nocheck
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.get('/api/cases', async (req, res) => {
	try {
		const cases = await prisma.case.findMany({
			include: {
				items: true
			}
		});

		res.json(cases);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching data from the database' });
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
