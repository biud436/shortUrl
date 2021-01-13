class App {
    async convertUrl(url) {
        let raw = `http://biud436.com:9003/insertUrl?url=${url}`;

        this.load(raw).then(ret => {
            ret = JSON.parse(ret);

            if(ret.success) {
                const divElem = document.createElement("div");
                divElem.innerHTML = `
                <div id="message" class="row alert alert-primary" role="alert">
                    http://biud436.com:9003/${ret.shortUrl}
                </div>                          
                `;
                const wrapper = document.querySelector(".wrapper");
                wrapper.appendChild(divElem);

                setTimeout(() => {
                    divElem.remove();
                }, 4000);
            }
        }).catch(err => {
            console.warn(err);
        })
    }

    load(url) {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function() {
                resolve(xhr.responseText);
            };
            xhr.onerror = function(err) {
                reject(err);
            }
            xhr.send();
        });
    }
}

let app = new App();

const shortButton = document.querySelector("#short-url-button");
shortButton.onclick = function() {

    /**
     * @type {HTMLInputElement}
     */
    const urlInput = document.querySelector("#url");
    const url = urlInput.value;

    app.convertUrl(url);

};
