import fs from 'fs';
import path from 'path';

const deleteFile = async (filePath: string) => {
    const file = path.resolve(filePath.replace(filePath[0], ''));
    await fs.promises.unlink(path.resolve(file));
}

export default deleteFile;