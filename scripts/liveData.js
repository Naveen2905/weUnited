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
            if (selectedCountry === countryName) {
                console.log(country);

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


            }
            else {
                swal("Incorrect Entry", "Please search again!", "error");
            }
        })
    })
}


liveDataApp.init = function () {


    // Function to get country and display news;
    $('.countrySearch').on('submit', function (e) {
        e.preventDefault();
        const countryName = $('#countryName').val();
        this.reset();
        liveDataApp.all(countryName);
    });
}


$(function () {
    liveDataApp.init();
});