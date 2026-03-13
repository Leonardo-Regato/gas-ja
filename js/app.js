const estados = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Pará": "PA",
  "Paraíba": "PB",
  "Paraná": "PR",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO"
}

const locationText = document.getElementById("locationValue");

if (navigator.geolocation) {
 
    navigator.geolocation.getCurrentPosition(function(position){

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {

            const bairro =
                data.address?.suburb ||
                data.address?.neighbourhood ||
                data.address?.city_district;
            
            const estadoNome = data.address.state
            const estadoSigla = estados[estadoNome];

            locationText.textContent = `${bairro || "Sua região"} · ${estadoSigla || ""}`;

        })
        .catch(() => {
            locationText.textContent = "Localização indisponível"
                })

    })

} else {
    locationText.textContent = "Localização não suportada"
}
