const { MongoClient, GridFSBucket } = require('mongodb');
const { Readable } = require('stream');
require('dotenv').config();

const dbNome = process.env.DB_NAME;
const url = process.env.MONGODB_URI;

exports.createCarrosel = async (req, res) => {
    if (!req.file) {
        console.error('Nenhum arquivo enviado');
        return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const { titulo, conteudo, link } = req.body;
    const cliente = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await cliente.connect();
        const database = cliente.db(dbNome);
        const bucket = new GridFSBucket(database, { bucketName: 'carroselCards' });

        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            metadata: { titulo, conteudo, link }
        });

        readableStream.pipe(uploadStream);

        uploadStream.on('error', (error) => {
            console.error('Erro ao enviar arquivo:', error);
            res.status(500).json({ erro: 'Erro ao enviar o arquivo' });
            cliente.close();
        });

        uploadStream.on('finish', () => {
            console.log('Arquivo enviado com sucesso');
            res.status(200).json({ message: 'Arquivo enviado com sucesso' });
            cliente.close();
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        res.status(500).json({ erro: 'Erro ao conectar ao MongoDB' });
        cliente.close();
    }
};

exports.listarCarrosel = async (req, res) => {
    const cliente = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await cliente.connect();
        const database = cliente.db(dbNome);
        const collection = database.collection('carroselCards.files');

        const files = await collection.find().toArray();

        res.status(200).json(files);
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        res.status(500).json({ erro: 'Erro ao conectar ao MongoDB' });
        cliente.close();
    }
};

exports.getCarrosel = async (req, res) => {
    const { filename } = req.params;
    console.log('Solicitando imagem:', filename); // Log para ver qual imagem está sendo solicitada
    const cliente = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await cliente.connect();
        const database = cliente.db(dbNome);
        const bucket = new GridFSBucket(database, { bucketName: 'carroselCards' });

        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.on('error', (error) => {
            console.error('Erro ao baixar arquivo:', error); // Log para ver qual imagem teve erro
            res.status(404).json({ erro: 'Arquivo não encontrado' });
        });

        downloadStream.pipe(res);
        
        downloadStream.on('end', () => {
            res.end();
            cliente.close();
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        res.status(500).json({ erro: 'Erro ao conectar ao MongoDB' });
        cliente.close();
    }
};
