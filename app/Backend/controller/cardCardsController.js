const { MongoClient, GridFSBucket } = require("mongodb");
const { Readable } = require("stream");
require('dotenv').config();

const dbNome = process.env.DB_NAME;
const url = process.env.MONGODB_URI;

exports.createCardCards = async (req, res) => {
    //verificação
    if(!req.file) {
        console.error('Nenhum arquivo enviado');
        return res.status(400).json({ erro: 'nenhum arquivo encontrado'});
    }

    //metadados
    const { titulo, conteudo, link } = req.body;
    const cliente = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        console.log('Conectando ao MongoDB...');
        await cliente.connect();
        console.log('Conexão estabelecida com sucesso ao MongoDB');
        
        const database = cliente.db(dbNome);
        const bucket = new GridFSBucket(database, { bucketName: 'cardCards' });

        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        console.log('Iniciando upload do arquivo...');
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            metadata: { titulo, conteudo, link }
        });

        readableStream.pipe(uploadStream);

        uploadStream.on('error', (error) => {
            console.error('Erro ao enviar arquivo:', error);
            res.status(500).json({ erro: 'erro ao enviar o arquivo' });
            cliente.close(); // Fechar conexão com o MongoDB
        });

        uploadStream.on('finish', () => {
            console.log('Arquivo enviado com sucesso');
            res.status(200).json({ message: 'arquivo enviado com sucesso' });
            cliente.close();
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        res.status(500).json({ erro: 'erro ao conectar ao MongoDB' });
        cliente.close();
    }
};

exports.listarCardCards = async (req, res) => {
    const cliente = new MongoClient(url);
    try{
        await cliente.connect();
        const database = cliente.db(dbNome);
        const bucket = new GridFSBucket(database, { bucketName: 'cardCards'});
        
        const carrosel = bucket.find()
        const file = await carrosel.toArray(); // listar o que tem dento da collection e armazenar na variavel
        
        if (!file || file.length === 0) {
            return res.status(404).json({ erro: 'Nenhum arquivo encontrado' });
        }

        res.status(200).json(file);
    }catch (error){
        console.error('Erro ao conectar so mongo' , error );
        res.status(500).json({error: 'Erro ao conectar ao mongo'})
    } finally {//fechando coneção mongo
        cliente.close();
    }
};

//download img
exports.getCardCards = async (req, res) => {
    const { filename } = req.params;
    const cliente = new MongoClient(url);

    try {
        await cliente.connect();
        console.log('Conexão estabelecida com sucesso ao MongoDB');

        const database = cliente.db(dbNome);
        const bucket = new GridFSBucket(database, { bucketName: 'cardCards'});
        
        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

          // Adiciona cabeçalhos apropriados para servir uma imagem
          res.setHeader('Content-Type', 'image/png'); // Ajuste o tipo de conteúdo conforme necessário

          
        downloadStream.on('error', (error) => {
            console.log('Erro ao baixar arquivo', error);
            res.status(400).json({ erro: 'Arquivo não encontrado' });
        });

        downloadStream.on('end', () => {
            res.end();
            cliente.close();
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB', error);
        res.status(500).json({ erro: 'Erro ao conectar ao MongoDB' });
    }
};