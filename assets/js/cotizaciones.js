window.addEventListener('load', function () {
    async function getPrice() {
        let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    async function renderDolars() {
        let dolars = await getPrice();
        let html = '';
        dolars.forEach(dolar => {
            if (dolar.casa.nombre == 'Dolar Blue') {
                let variacion = parseFloat(dolar.casa.variacion.replace(',', '.'));
                if (variacion > 0.1) {
                    chrome.runtime.sendMessage('', {
                        type: 'notification',
                        options: {
                            title: 'Dolar Cotizaciones',
                            message: 'El USD Blue subio %' + dolar.casa.variacion,
                            iconUrl: 'https://media.istockphoto.com/id/1407087565/es/foto/cambio-de-moneda-y-concepto-de-dinero-con-s%C3%ADmbolo-de-d%C3%B3lar-digital-brillante-naranja-sobre.webp?s=2048x2048&w=is&k=20&c=NqnmSThoNsl_q-Vc6gN5A8qPAVe-45bDB_ZYcUj7MAE=',
                            type: 'basic'
                        }
                    })
                }

            }
            if (dolar.casa.nombre == 'Argentina') {
                dolar.casa.nombre = 'Riesgo Pais';
                dolar.casa.variacion = '';
            }
            if (dolar.casa.nombre == 'Dolar Contado con Liqui') {
                dolar.casa.nombre = 'Contado con Liqui';
            }
            if (dolar.casa.variacion == 'undefined') {
                dolar.casa.variacion = '';
            }
            let htmlSegment = `
                                <table class="table">
                                    <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Compra</th>
                                        <th scope="col">Venta</th>
                                        <th scope="col">Variacion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>${dolar.casa.nombre}</td>
                                        <td>${dolar.casa.compra}</td>
                                        <td>${dolar.casa.venta}</td>
                                        <td>${dolar.casa.variacion}</td>
                                    </tr>
                                    </tbody>
                                </table>`;

            html += htmlSegment;


        });

        let container = document.querySelector('.container-price');
        container.innerHTML = html;
    }

    renderDolars();
    // setInterval(function() {

    //     chrome.runtime.sendMessage('', {    
    //         type: 'notification',
    //         options: {
    //             title: 'Dolar Cotizaciones',
    //             message: 'El USD Blue subio %' + l,
    //             iconUrl: 'https://media.istockphoto.com/id/1407087565/es/foto/cambio-de-moneda-y-concepto-de-dinero-con-s%C3%ADmbolo-de-d%C3%B3lar-digital-brillante-naranja-sobre.webp?s=2048x2048&w=is&k=20&c=NqnmSThoNsl_q-Vc6gN5A8qPAVe-45bDB_ZYcUj7MAE=',
    //             type: 'basic'
    //         }
    //     })

    // }, 3000); 
});



