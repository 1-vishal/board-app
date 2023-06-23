const baseUrl = 'https://my-json-server.typicode.com/1-vishal/board-json-server';

export const getAll = (type) => {
    var result = fetch(`${baseUrl}/${type}`).then(res =>
        res.json()).then(result => {
            return result
        })
        .catch((e) =>{
            return []
        });

    return result
}
export const get = async(id, type) => {
    var result = await fetch(`${baseUrl}/${type}/${id}`).then(res =>
            res.json()).then(result => {
                return result
            })
            .catch((e) =>{
                return {}
            });

    return result
}
export const deleteData = (id, type) => {
    var status = fetch(`${baseUrl}/${type}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res =>
        res.json()).then(result => {
            return true
        })
        .catch((e) =>{
            return false
        });

    return status
}
export async function  post (id, method, noticeform, type) {
    let url = method === "POST" ? `${baseUrl}/${type}`:`${baseUrl}/${type}/${id}`
    var status = await fetch(url, {
        method: method,
        body: JSON.stringify({
            title: noticeform.title,
            content: noticeform.content,
            author: noticeform.author,
            date: new Date().toLocaleString() + ''
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((post) => {
            return (true) 
        })
        .catch((err) => {
            console.log(err.message);
            return false
        });

    return status
}