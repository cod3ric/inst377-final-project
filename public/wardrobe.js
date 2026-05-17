async function loadClothes() {
    const response = await fetch("/clothes");
    const clothes = await response.json();

    const tableBody = document.getElementById("clothesTableBody");

    tableBody.innerHTML = "";

    clothes.forEach((item) => {
        const tableRow = document.createElement("tr");

        const name = document.createElement("td");
        const category = document.createElement("td");
        const weatherType = document.createElement("td");
        const minTemp = document.createElement("td");
        const maxTemp = document.createElement("td");
        const image = document.createElement("td");

        name.innerHTML = item.name;
        category.innerHTML = item.category;
        weatherType.innerHTML = item.weather_type;
        minTemp.innerHTML = item.min_temp;
        maxTemp.innerHTML = item.max_temp;
        image.innerHTML = `<img src="${item.image_url}" alt="No Image Provided" width="60">`;

        tableRow.appendChild(name);
        tableRow.appendChild(category);
        tableRow.appendChild(weatherType);
        tableRow.appendChild(minTemp);
        tableRow.appendChild(maxTemp);
        tableRow.appendChild(image);

        tableBody.appendChild(tableRow);
    });
}

async function createClothingItem() {
    await fetch('/clothes', {
        method: 'POST',
        body: JSON.stringify({
            name: `${document.getElementById('name').value}`,
            category: `${document.getElementById('category').value}`,
            weatherType: `${document.getElementById('weatherType').value}`,
            minTemp: `${document.getElementById('minTemp').value}`,
            maxTemp: `${document.getElementById('maxTemp').value}`,
            imageURL: `${document.getElementById('imageURL').value}`,
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then((result) => result.json());

    alert('Clothing item added successfully!');

    document.getElementById('clothingForm').reset();

    await loadClothes();
}

window.onload = loadClothes;