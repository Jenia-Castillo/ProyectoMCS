const axios = require('axios');
//const {} = require('../config').default;
const PAYPAL_API_CLIENT = 'AYj6RZiC_2QK5QxILYKCCR1o2oPHLuQ3yFWXETMbH1EcpgYW8jhGZkFO1zjQ9b4mqaGMb1405DcAxXrT'
const PAYPAL_API_SECRET = 'EFYg3OL7aKOVCNYYGB_gLwt9V0VaPkuO1_u65ie4LB74VvaD7OA28AViIUHoiZeIIh0v34s3VMySb18S'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
//Cosas de Paypall
//
exports.crearOrden = async (req, res) =>{
    //
    try {
        const costo = req.params.costo;
        const order = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: costo,
              },
            },
          ],
          application_context: {
            brand_name: "Medical Costumer Service",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3000/citasprogramadas",
            cancel_url: "http://localhost:3000/crearcita",
          },
        };
    //
    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        order,
        {
            auth:{
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET,
            }
        }
      );
    //
    //
    /*const orden = {
        intent: 'CAPTURE',
        purchase_units:[
            {
            amount: {
                    currency_code: 'USD',
                    value: '10.00'
                },
                description: "Cita general",
            },
        ],
        application_context:{
            brand_name: "Medical Costumer Service",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3000/capturaorden",
            cancel_url: "http://localhost:3000/cancelaorden",
        },
    };*/
    /*const response = await axios.post('${PAYPAL_API}/v2/checkout/orders', orden,{
        auth:{
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
        }
    });*/
    //var obj = JSON.parse(response);
    //console.log(response.data.links[1].href);
    res.redirect(response.data.links[1].href)
    //return res.json(response.data.links[1].href);
}catch (error) {
    console.log(error.message);
    return res.status(500).json("Algo salio Mal");
  }
}

//
exports.capturaOrden = (req, res) =>{
    res.send('captura orden')
}

//
exports.cancelaOrden = (req, res) =>{
    res.send('cancela orden')
}