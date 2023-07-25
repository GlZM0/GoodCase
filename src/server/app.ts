// @ts-nocheck
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.get('/api/milSpecCase', async (req, res) => {
	try {
		const milSpecCase = await prisma.case.findUnique({
			where: {
				id: '64bb95e4b2bdcb4142772c66'
			}
		});

		res.json(milSpecCase);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching data from the database' });
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
