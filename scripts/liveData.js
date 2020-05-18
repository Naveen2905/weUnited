const liveDataApp = {
    url: `https://api.covid19api.com/summary`
};



//World Covid-19 Data
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
            
            if (countryName === selectedCountry) {

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
});