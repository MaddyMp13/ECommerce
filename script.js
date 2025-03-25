document.addEventListener("DOMContentLoaded", async () => {
    let products = document.getElementById("products");
    let colors = document.getElementById("color");
    let brand = document.getElementById("brand");
    let search = document.getElementById("search");
    let Btn = document.getElementById("searchBtn");

    let data = [];


    // Function to Display Products
    let showProducts = (items) => {
        products.innerHTML = '';
        colors.innerHTML = '';
        brand.innerHTML = '';

        items?.forEach(element => {
            products.innerHTML += `
                <div class="card">
                    <div class="box d-flex my-0">
                        <div class="d-flex justify-content-between w-100">
                            <div class="span">${element.tag}</div>
                            <div class="like"><i class="bi bi-heart"></i></div>
                        </div>
                        <div class="img">
                            <img src="${element.image}" alt="" height="150" width="160">
                        </div>
                    </div>
                    <div class="my-3 px-3">
                        <div class="d-flex justify-content-between" style="font-size: 16px; font-weight: 600;">
                            <p>${element.name}</p>
                            <p>${element.price}</p>
                        </div>
                        <p style="font-size: 12px;margin-top: -15px;">${element.description}</p>
                    </div>
                </div>
            `;

            colors.innerHTML += `<div class="clr" style="background-color: ${element.color}; border:1px solid"></div>`;

            brand.innerHTML += `
                <div class="customOpt align-items-center gap-2 my-1" style="display:${element.brand !== "" ? "flex" : "none"}">
                    <div class="checked d-flex justify-content-center align-items-center"
                        style="background-color: #3D394F; width: 20px; height: 20px; border-radius: 100%;">
                        <i class="bi bi-check2" style="color: white;"></i>
                    </div>
                    <div style="display:${element.brand !== "" ? "block" : "none"}">${element.brand}</div>
                </div>
            `;
        });
    };

     // Fetch Data
     const fetchData = async () => {
        try {
            const response = await fetch("myAPI.json");
            data = await response.json();
            showProducts(data?.device); // Call after fetching
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    // Wait for data to be fetched before adding event listener
    await fetchData();

    // Search Functionality
    Btn.addEventListener("click", (e) => {
        e.preventDefault();

        let searchValue = search.value.toLowerCase(); // Convert input to lowercase

        let filteredData = data?.device.filter((item) => 
            (item.name?.toLowerCase() || "").includes(searchValue) || 
            (item.description?.toLowerCase() || "").includes(searchValue) ||
            (item.brand?.toLowerCase() || "").includes(searchValue) ||
            (item.color?.toLowerCase() || "").includes(searchValue)||
            (item.price?.toLowerCase() || "").includes(searchValue)

            
        );

        showProducts(filteredData); // Display search results
    });
});
