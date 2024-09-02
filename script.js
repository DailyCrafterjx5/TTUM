document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    let productName = "";
    let productPrice = 0;

    if (product) {
        const productDetails = document.getElementById('product-details');

        switch(product) {
            case 'ebook':
                productName = "eBook: Learn Web Development";
                productPrice = 10.00;
                break;
            case 'artpack':
                productName = "Digital Art Pack";
                productPrice = 15.00;
                break;
            default:
                productName = "Unknown Product";
                productPrice = 0;
        }

        productDetails.textContent += `${productName} ($${productPrice.toFixed(2)})`;
    }

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: productName,
                    amount: {
                        currency_code: 'USD',
                        value: productPrice.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '!');
                // After successful payment, provide the download link or redirect to a download page.
                // In a real app, you'd send the digital file or link via email.
            });
        },
        onError: function(err) {
            console.error(err);
            alert('An error occurred during the transaction.');
        }
    }).render('#paypal-button-container'); // Display payment button on your web page
});
