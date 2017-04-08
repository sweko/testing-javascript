import { FileSystem } from './fs-helper';

const fs = new FileSystem();
const data = "../data";

interface IBook {
    title: string;
    author: string;
    year: number;
    isWinner: boolean;
    isRead: boolean;
}

(async () => {
    const datapath = await fs.readDirectory(data);
    datapath.forEach(async element => {
        const source = await fs.readTextFile(fs.joinPath(data, element));
        const books: IBook[] = JSON.parse(source);
        let year = books[0].year;
        books[0].isWinner = true;
        for (let index = 1; index < books.length; index++) {
            const book = books[index];
            if (book.year === year) {
                book.isWinner = false;
            } else {
                year = book.year;
                book.isWinner = true;
            }
            book.isRead = false;
        }
        await fs.writeTextFile(fs.joinPath(data, fs.addFileNameSuffix(element, "-wins")), JSON.stringify(books));
    });
})();
