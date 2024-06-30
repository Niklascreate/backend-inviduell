# Individuell uppgift backend Niklas Nilsson



## Dokumentation Individuell uppgift:

##Mina endpoints:

###POST = LOGIN Admin: http://localhost:8080/admin/login
Denna endpoint används för att logga in som admin för att kunna utföra alla endpoints nedan. När man loggat in sparas allting med express-session där data om användaren lagras. Man loggar i med JSON så här :
{
	"username": "admin",
	"password": "admin123"
}

###GET = GET Products: http://localhost:8080/products
Här hämtar man alla produkter från menyn.

###PUT = MODIFY Product: http://localhost:8080/modify/modifyproduct/:id
Om man hämtar ett id på en produkt i databasen kan man sedan använda den för att modifiera den produkten i denna endpointen. För att utföra detta kan man skriva följande: 

 {
        "id": 20,
        "title": "vatten",
        "desc": "Bryggd på öl",
        "price": "5 kr",
        "about": ""
    }



###GET = GET specific Product: http://localhost:8080/modify/:id
Och här kan man genom produktens id hämta en specifik produkt.

POST = ADD Product: http://localhost:8080/modify/add
Vill man som admin lägga till nya produkter kan man använda denna endpoint. Och då skrivar man i JSON så här:

 {
        "id": 1000,
        "title": "vatten med humle",
        "desc": "Bryggd på öl",
        "price": "10 kr",
        "about": ""
    }

###DELETE = DELETE Product: http://localhost:8080/modify/delete/:id

###POST = KAMPANJ Products: http://localhost:8080/kampanj/add


