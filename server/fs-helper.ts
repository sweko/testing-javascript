import * as fs from 'fs';
import * as path from 'path';

export class FileSystem {
    public getExtension(filename: string) {
        return path.extname(filename);
    }

    public getFileNameWithoutExtension(filename: string) {
        return path.basename(filename, path.extname(filename));
    }

    public addFileNameSuffix(filename: string, suffix: string){
        let ext = path.extname(filename);
        let base = path.basename(filename, ext);
        let dir = path.dirname(filename);
        let newFileName = `${base}${suffix}${ext}`;
        return path.join(dir, newFileName);
    }


    public readDirectory(name: string): Promise<string[]> {
        const promise = new Promise<string[]>((resolve, reject) => {
            fs.readdir(name, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
        return promise;
    }

    public joinPath(...paths: string[]): string {
        return path.join(...paths);
    }

    public readTextFile(name: string): Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            fs.readFile(name, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
        return promise;
    }

    public writeTextFile(name: string, data: string): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            fs.writeFile(name, data, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return promise;
    }
}
