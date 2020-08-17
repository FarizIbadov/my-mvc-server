import path from 'path';
import Jimp from 'jimp';

interface Size {
    width?: number;
    height?: number;
}

const imageCompressor = async (filePath: string, size: Size) => {
    const absPath = path.resolve(filePath);
    const img = await Jimp.read(absPath);
    img.resize(size.width || Jimp.AUTO, size.height || Jimp.AUTO);
    img.write(absPath);
    return '/' + filePath;
}

export default imageCompressor