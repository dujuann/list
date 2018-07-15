let fetchData = (url, method, postData) => {
    if(method === 'GET') {
        return fetch(url, {
            credentials: "same-origin"
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            if(data && data.errNo && data.errNo == 100151010) {
                if(document.cookie.include('SSO_AS_SUB_TICKET')) {
                    console.error('server error');
                } else {
                    window.location.href = 'http://mis-test.diditaxi.com.cn/auth/sso/login?app_id=1151&version=1.0&jumpto=http%3A%2F%2F10.95.157.238%3A8081%2Fdidiface%2Fdist%2Findex.html';
                }
            } else {
                return data;
            }
        }).catch((error) => {
            console.error(error);
        })
    } else {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            credentials: "same-origin"
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}
export default fetchData;