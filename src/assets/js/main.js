// Google Structured Data
// https://developers.google.com/search/docs/guides/intro-structured-data
{
    "@context": "http://schema.org",
    "@type": "Restaurant",
    "image": [
        "../../tile-wide.png",
    ],
    "@id": "http://davessteakhouse.example.com",
    "name": "Dave's Steak House",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "148 W 51st St",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10019",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.761293,
        "longitude": -73.982294
    },
    "url": "http://www.example.com/restaurant-locations/manhattan",
    "telephone": "+12122459600",
    "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday"
            ],
            "opens": "11:30",
            "closes": "22:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "11:30",
            "closes": "23:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "16:00",
            "closes": "23:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "16:00",
            "closes": "22:00"
        }
    ],
    "menu": "http://www.example.com/menu",
    "acceptsReservations": "True"
}

// Smooth Scroll: https: //www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

// Animations 
new WOW().init();