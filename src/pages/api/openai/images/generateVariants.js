import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";
import sharp from 'sharp';
import dotenv from 'dotenv'
dotenv.config();

export default async function handler(req, res) {
    try {

        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Only POST requests allowed' })
        }
        const body = JSON.parse(req?.body || '{}')
        const { imgUrl } = body;

        if (!imgUrl) {
            return res.status(400).send({ message: 'Missing "imgUrl" in body of request' })
        }

        // validate file type in URL
        const imgUrlType = imgUrl.split("?")[0].match(/([\w]{2,4})$/g)[0];
        const validImgTypes = ['png', 'jpg']
        if (!validImgTypes.includes(imgUrlType)) {
            // reject invalid image types
            return res.status(400).send({ message: `Invalid image type provided in the url! Accepted types are ${validImgTypes.join(',')}` })
        }

        // load image from URL
        let fetchImageResponse, fetchImageBuffer, resizedImageBuffer;
        try {
            fetchImageResponse = await fetch(imgUrl);
            //prep array buffer for sending to openai
            fetchImageBuffer = Buffer.from(await fetchImageResponse.arrayBuffer())
            // make 1.0 aspect ratio per openai requirments
            resizedImageBuffer = await sharp(fetchImageBuffer)
                .resize(512, 512)
                .png()
                .toBuffer();

            // set image name to .png
            resizedImageBuffer.name = 'pAInt-it-image.png'

        } catch (e) {
            return res.status(400).send({ message: `There was an error loading your image: ${e.message}` })
        }

        try {
            // init openai
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);

            // request image variant(s) from openai with buffer
            const response = await openai.createImageVariation(
                resizedImageBuffer,
                3,
                "1024x1024"
            );
            const payload = { variantImages: response.data.data }
            console.log('payload', payload);
            res.json(payload)
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
                return res.status(400).send({ message: `${error.response.status} - There was an error generating your image(s): ${e.message}`, data: error.response.data })
            } else {
                console.log(error.message);
                return res.status(400).send({ message: error.message })
            }
        }
    } catch (e) {
        return res.status(500).send({ message: `There was an error processing your request` })
    }
}