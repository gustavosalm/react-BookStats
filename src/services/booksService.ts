import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/',
});

export const getBooks = async () => {
    let url = 'volumes?q=subject:fiction+subject:drama';
    const response = await api.get(url);

    return response;
}

export const getBooksByTitle = async (title: string) => {
    let url = `volumes?q=intitle:"${title.replace(' ', '+')}"`;
    const response = await api.get(url);

    return response;
}

export const getBooksByAuthor = async (author: string) => {
    let url = `volumes?q=inauthor:"${author.replace(' ', '+')}"`;
    const response = await api.get(url);

    return response;
}
