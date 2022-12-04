
var produits = [
    {
        designation:"Clavier",
        quantite:50
    },
    {
        designation:"Baffle",
        quantite:40
    },
    {
        designation:"Ecran",
        quantite:35
    }
]

var templates = 
    {
        "liste":`
                <div>
                <h2>Liste des produits récents:</h2>
                
                <table>
            
                </table>
            </div>

        `,
        "nouvel":`
            <div>
                <h2>Nouvel achat</h2>
                <select id="select">
                    
                </select>
                <input type="number" id="nombre">
                <button onclick="NouvelAchat()">valider</button>
                <div id="ajout_success">
                    Nouvel achat effectué avec succès.
                </div>
            </div>

        `,
        "nouveau":`
        
                <div>
                    <h2>Ajouter un Nouveau produit :</h2>
                    <input id="designation" type="text" placeholder="Désignation.."><br>
                    <input id="quantite" type="number" placeholder="quantité..">
                    <button onclick="AjouterProduit()">
                        Ajouter
                    </button>
                    <div id="ajout_success">Un nouveau Produit ajouté.</div>
                </div>
        `
            
        
    }


// démarrage

document.querySelector('#app').innerHTML = templates['liste'];
BuildListe()

function ChangeTempalte(pr){
    document.querySelector('#app').innerHTML = templates[pr];
    document.querySelector('.active').classList.remove('active');
    document.querySelector('#'+pr).classList.add('active')

    if(pr == 'liste'){
        BuildListe()
    }

    else if(pr == "nouvel"){
        BuildSelection()
    }
}




function BuildListe(){
    var t = `
        <tr>
            <th>Désignation</th>
            <th>Quantité</th>
            <th>Suppression</th>
        </tr>
    `
    produits.forEach(function(produit, index){
        t += `
        
            <tr>
                <td>${produit.designation}</td>
                <td>${produit.quantite}</td>
                <td><button onclick="Supprimer(${index})">supprimer</button></td>
            </tr>
        `
    })

    document.querySelector('table').innerHTML = t
}

function Supprimer(index){
    produits.splice(index, 1)
    BuildListe()
}



function AjouterProduit(){
    var designation = document.querySelector('#designation').value
    var quantite = document.querySelector('#quantite').value

    if(designation != "" && quantite != ""){
        produits.unshift({designation,quantite })
        document.querySelector('#designation').value = ""
        document.querySelector('#quantite').value = ""
        document.querySelector('#ajout_success').style.display = "block"
        setTimeout(() => {
            document.querySelector('#ajout_success').style.display = "none"
            
        }, 2000);
    }

}



function BuildSelection(){
    var t = `
    
    `
    produits.forEach(function(produit){
        t += `
        <option value="${produit.designation}">${produit.designation}</option>
        `
    })

    document.querySelector('#select').innerHTML = t
}


function NouvelAchat(){
    var nombre = document.querySelector('#nombre').value
    var select = document.querySelector('select').value

    produits.forEach(function(produit){
        if(produit.designation == select){
            produit.quantite = parseInt(produit.quantite)+ parseInt(nombre)
        }
    })

    document.querySelector('#ajout_success').style.display = "block"
    setTimeout(() => {
    document.querySelector('#ajout_success').style.display = "none"
        
    }, 2000);
}