export var fetchSometingApi = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("加载完毕，这是你要的一段数据");
        }, 3000);
    });
}
