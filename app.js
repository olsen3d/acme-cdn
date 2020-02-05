/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
const table = document.querySelector(".table");
const head = document.querySelector(".header");
const numOfProducts = document.querySelector(".numOfProducts");
const numOfCompanies = document.querySelector(".numOfCompanies");

const productsNav = document.querySelector(".products");
const companiesNav = document.querySelector(".companies");

const products = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
const companies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies');

const renderAll = Promise.all([products, companies])
    .then(responses => {
        return responses.map(response => response.data);
});

renderAll.then(data => {
    const product = data[0];
    const company = data[1];

    renderNavBar(product, company);
    renderProducts(product);
    return data
});

window.addEventListener("hashchange", () => {
    const page = window.location.hash.slice(1);
    if(page === "companies") {
        companiesNav.classList.add("active");
        productsNav.classList.remove("active");
        renderAll.then( data => renderCompanies(data[1]));

    } else if(page === "products") {
        companiesNav.classList.remove("active");
        productsNav.classList.add("active");
        renderAll.then( data => renderProducts(data[0]));
    }
});

const renderNavBar = (product, company) => {
    numOfProducts.innerHTML = `Products (${product.length})`;
    numOfCompanies.innerHTML = `Companies (${company.length})`;
};

const renderCompanies = inputData => {
    //#################### getting the table heads
    const properties = Object.getOwnPropertyNames(inputData[0]);
    console.log(properties);
    const htmlForHead = properties.map(prop => {
        return `
            <td>${prop.toUpperCase()}</td>
        `;
    }).join('');
    head.innerHTML = htmlForHead;
    //######################

    //################## getting the data
    const htmlForData = inputData.map(data => {
        return `
        <tr class="entry">
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.phone}</td>
            <td>${data.state}</td>
            <td>${data.catchPhrase}</td>
            <td>${data.createdAt}</td>
            <td>${data.updatedAt}</td>
        </tr>
    `}).join('');
    table.innerHTML = htmlForData;
    //################### 
};

const renderProducts = inputData => {
     //#################### getting the table heads
     const properties = Object.getOwnPropertyNames(inputData[0]);
     const htmlForHead = properties.map(prop => {
         return `
             <td>${prop.toUpperCase()}</td>
         `;
     }).join('');
     head.innerHTML = htmlForHead;
     //######################

     //###################### getting data
    const htmlForData = inputData.map(data => {
        return `
        <tr class="entry">
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.description}</td>
            <td>${data.suggestedPrice}</td>
            <td>${data.createdAt}</td>
            <td>${data.updatedAt}</td>
        </tr>
    `}).join('');
    table.innerHTML = htmlForData;
    //#########################
};
