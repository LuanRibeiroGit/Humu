import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient()

const app = express()
app.use(express.json())



app.post("/transfer", async (req: Request, res: Response) => {
    try {
        //const tokenData = verifyJWT(req.headers.authorization!);
        const { sourceAccount, destinationAccount, amount } = req.body;
        console.log(sourceAccount, destinationAccount, amount)

        if (!sourceAccount || !destinationAccount || !amount) {
            return res.status(400).json({ message: "Dados inválidos" });
        }
        const source = await prisma.account.findUnique({
            where: { number: sourceAccount },
        });

        console.log(source)
        if (!source || source.balance < amount) {
            return res.status(400).json({ message: "Saldo insuficiente" });
        }

        const destination = await prisma.account.findUnique({
            where: { number: destinationAccount },
        })

        console.log(destination)

        if (!destination) {
            return res.status(404).json({ message: "Conta destino não encontrada" });
        }
        await prisma.transfer.create({
            data: {
                id: uuid(),
                source_account: sourceAccount,
                destination_account: destinationAccount,
                amount,
                created_by: 'tokenData.userId',
            },
        });
        await prisma.account.update({
            where: { number: sourceAccount },
            data: { balance: source.balance - amount },
        });
        await prisma.account.update({
            where: { number: destinationAccount },
            data: { balance: destination.balance + amount },

        });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Erro ao processar transferência:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
