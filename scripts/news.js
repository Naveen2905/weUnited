const worldNewsApp = {
    query: `"coronavirus" OR "covid-19"`,
    key: 'dbd2da25f5f84f779e6ee7f7c49c5f7d',
    pageSize: 20,
}


const newsApp = {
    key: 'dbd2da25f5f84f779e6ee7f7c49c5f7d',
    query: 'covid-19',
    category: 'health',
    country: 'ca',
};

const indiaNewsApp = {
    key: 'dbd2da25f5f84f779e6ee7f7c49c5f7d',
    query: 'covid-19',
    category: 'health',
    country: 'in',
};

//World News---------------------------------
worldNewsApp.world = function () {
    $('ul.newsLists').empty(); // empty the ul before fetching and adding new data
    $.ajax({
        url: `https://newsapi.org/v2/everything`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: worldNewsApp.key,
            q: worldNewsApp.query,
            pageSize: worldNewsApp.pageSize,
        }
    }).then(function (data) {
        data.articles.forEach(function (eachWorldNews) {
            const htmlToAppend = `<li>
                                    <a href=${eachWorldNews.url} target="_blank">
                                    <h3>${eachWorldNews.title}</h3>
                                    <img src=${eachWorldNews.urlToImage} alt="${eachWorldNews.title}">
                                    <p>${eachWorldNews.description}</p>
                                    </a>
                                </li>`
            $('ul.newsLists').append(htmlToAppend);
        })
    })
}


//Canada news ----------------------------------
newsApp.canada = function () {
    $('ul.newsLists').empty(); // empty the ul before fetching and adding new data
    $.ajax({
        url: `https://newsapi.org/v2/top-headlines`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: newsApp.key,
            q: newsApp.query,
            category: newsApp.category,
            country: newsApp.country,
        }
    }).then(function (result) {
        // Iterrating through array
        result.articles.forEach(function (eachNews) {
            const htmlToAppend = `<li>
                                    <a href=${eachNews.url} target="_blank">
                                    <h3>${eachNews.title}</h3>
                                    <img src=${eachNews.urlToImage} alt="${eachNews.title}">
                                    <p>${eachNews.description}</p>
                                    </a>
                                </li>`
            $('ul.newsLists').append(htmlToAppend);
        })

    })
}

//India news ----------------------------------
indiaNewsApp.india = function () {
    $('ul.newsLists').empty(); // empty the ul before fetching and adding new data
    $.ajax({
        url: `https://newsapi.org/v2/top-headlines`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: indiaNewsApp.key,
            q: indiaNewsApp.query,
            category: indiaNewsApp.category,
            country: indiaNewsApp.country,
        }
    }).then(function (result) {
        // Iterrating through array
        result.articles.forEach(function (eachNews) {
            const htmlToAppend = `<li>
                                    <a href=${eachNews.url} target="_blank">
                                    <h3>${eachNews.title}</h3>
                                    <img src=${eachNews.urlToImage} alt="${eachNews.title}">
                                    <p>${eachNews.description}</p>
                                    </a>
                                </li>`
            $('ul.newsLists').append(htmlToAppend);
        })

    })
}


newsApp.init = function () {

    // Default Selection 
    worldNewsApp.world();
    $('.worldSelection').addClass('selected');

    // Function to get country and display news;
    $('.search a').on('click', function (e) {

        if (e.target.name === 'ca') {
            newsApp.canada();
        } else if (e.target.name === 'in') {
            indiaNewsApp.india();
        }
        else {
            worldNewsApp.world();
        }

        $('.search a').removeClass('selected')
        $(this).addClass('selected')
    });

}


$(function () {
    newsApp.init();
});