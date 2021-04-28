const liveDataApp = {
    url: `https://api.covid19api.com/summary`
};



//Country Covid-19 Data
liveDataApp.all = function (countryName) {
    $.ajax({
        url: liveDataApp.url,
        method: 'GET',
        dataType: 'json',
    }).then(function (response) {

        const allCountries = response.Countries;
        //Iterating through Array

        allCountries.forEach(country => {
            const selectedCountry = country.Slug;

            if (countryName == selectedCountry) {
                console.log(`${countryName} = ${selectedCountry}`);

                //Country Name
                const name = country.Country;
                $('.coName').html(`<h3>${name}</h3>`);

                //New Cases
                $('.newHeading').html(`New Cases`)
                const newCon = country.NewConfirmed;
                $('.nCon').html(`Confirmed : ${newCon}`);
                const newDeaths = country.NewDeaths;
                $('.nDeaths').html(`Deaths : ${newDeaths}`);
                const newRecovered = country.NewRecovered;
                $('.nRecovered').html(`Recovered : ${newRecovered}`);

                // Total Cases 
                $('.totalHeading').html(`Total Cases`)
                const totalCon = country.TotalConfirmed;
                $('.tCon').html(`Confirmed : ${totalCon}`);
                const totalDeaths = country.TotalDeaths;
                $('.tDeaths').html(`Deaths : ${totalDeaths}`);
                const totalRecovered = country.TotalRecovered;
                $('.tRecovered').html(`Recovered : ${totalRecovered}`);
            }
        })
    })
}


liveDataApp.init = function () {
    liveDataApp.all()
    // Function to get country and display news;
    $('.countrySearch').on('submit', function (e) {
        e.preventDefault();
        const countryName = $('#countryName').val().toLowerCase();
        this.reset();
        liveDataApp.all(countryName);
    });
}

$(function () {
    liveDataApp.init();

    $.ajax({
        url: liveDataApp.url,
        method: 'GET',
        dataType: 'json',
    }).then(function (response) {

        const allCountries = response.Countries;

        //Iterating through Array

        allCountries.forEach(country => {
            const selectedCountry = country.Slug;

            if ('india' == selectedCountry) {

                //Country Name
                const name = country.Country;
                $('.coName').append(`<h3>${name}</h3>`);

                //New Cases
                $('.newHeading').append(`New Cases`)
                const newCon = country.NewConfirmed;
                $('.nCon').append(`Confirmed : ${newCon}`);
                const newDeaths = country.NewDeaths;
                $('.nDeaths').append(`Deaths : ${newDeaths}`);
                const newRecovered = country.NewRecovered;
                $('.nRecovered').append(`Recovered : ${newRecovered}`);

                // Total Cases 
                $('.totalHeading').append(`Total Cases`)
                const totalCon = country.TotalConfirmed;
                $('.tCon').append(`Confirmed : ${totalCon}`);
                const totalDeaths = country.TotalDeaths;
                $('.tDeaths').append(`Deaths : ${totalDeaths}`);
                const totalRecovered = country.TotalRecovered;
                $('.tRecovered').append(`Recovered : ${totalRecovered}`);

                //Indian States Cases

                fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "9dddb264damshce01b3c59cd4a92p1a1830jsn635bdf2b7122",
                        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
                    }
                })
                    .then(response => response.json())
                    .then(function (data) {
                        $(".loading").hide();
                        const allStates = data.state_wise;
                        console.log(allStates);
                        for (const property in allStates) {
                            const stateName = property
                            const stateData = allStates[property]
                            $('.states').append(`<li class='stateLinks'><a href="#">${stateName}</a></li>`)

                            $('.stateLinks a').on('click', function () {
                                if (this.text === stateName) {
                                    const currentCityData = stateData;
                                    const nCases = currentCityData.deltaconfirmed;
                                    const nDeaths = currentCityData.deltadeaths;
                                    const nRecovered = currentCityData.deltarecovered
                                    const lastUpdated = currentCityData.lastupdatedtime
                                    swal(stateName + " Data", 'New Cases: ' + nCases + '\n' + 'New Deaths: ' + nDeaths + '\n' + 'New Recovered: ' + nRecovered + '\n' + '\n' + 'Last Updated data on ' + lastUpdated);
                                }
                            })
                        }
                    })

                    .catch(err => {
                        console.error(err);
                    });
            }

        })
    })
});