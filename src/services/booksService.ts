import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/',
});

export const getBooks = async () => {
    let url = 'volumes?q=subject:Fiction&maxResults=40&printType=books&orderBy=relevance&language=en';
    const response = await api.get(url);
    console.log(response);

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

export const getBooksByCategory = async (category: string) => {
    let url = `volumes?q=subject:"${category}"&maxResults=30&printType=books&orderBy=relevance`;
    const response = await api.get(url);

    return response;
}

export const getBooksWithFilters = async (category: string, author: string, title: string) => {
    if (category === '' && author === '' && title === '') return null;
    let filters: string[] = [];
    if (category !== '') filters.push(`subject:${category}`);
    if (author !== '') filters.push(`inauthor:${author}`);
    if (title !== '') filters.push(`intitle:${title}`);

    let url = `volumes?q=${filters.join('+')}&maxResults=30&printType=books&orderBy=relevance`

    const response = await api.get(url);

    return response;
}
