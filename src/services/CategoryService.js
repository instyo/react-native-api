const API = 'http://apiendpoint/reactnews/'

export function fetchData() {
    let url = API + 'listCategory.php'
    const response = fetch(url);
    return response.json();
}