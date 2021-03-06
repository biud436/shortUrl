class App {
    async convertUrl(url) {
        let raw = `https://biud436.com:9004/insertUrl?url=${url}`;

        this.load(raw).then(ret => {
            ret = JSON.parse(ret);

            if(ret.success) {
                const divElem = document.createElement("div");
                divElem.innerHTML = `
                <div id="message" class="row alert alert-primary" role="alert">
                    https://biud436.com:9004/${ret.shortUrl}
                </div>                          
                `;
                const wrapper = document.querySelector(".wrapper");
                wrapper.appendChild(divElem);

                // setTimeout(() => {
                //     divElem.remove();
                // }, 10000);
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
