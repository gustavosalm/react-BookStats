export interface Books {
    id: string;
    volumeInfo: {
        authors: string[];
        imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
        };
        title: string;
    }
}