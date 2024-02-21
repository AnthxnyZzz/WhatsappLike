/*Anthoo Whatsapp Like

Le code actualise gère toutes les fenètres disponibles sur la page
Même quand vous n'êtes pas dans la discussion de la personne concernée, vous recevrez quand même les messages accompagnés
d'une notification en haut à droite de l'écran. 

L'onglet contact et le chat sont des div déroulantes, il vous déplacer avec la molette de la souris pour atteindre le haut
des messages ou des contacts ou le bas...

La zone de saisie du message ne s'affiche qu'à la première selection d'un contact, pour éviter que vous n'écriviez
pour rien.

Pour supprimer un contact, vous avez le choix entre le supprimer avec son identifiant de relation, ou son adresse mail.


L'arrivée d'un message est accompagnée d'un effet sonore et l'envoi de même.
L'arrière plan des messages du destinataires est en vert, le votre est en jauge clair.

Un bouton retour est placé en haut à gauche de l'écran. 

----------------------------------------------*/



//Déclaration des variables de gestions des fenêtres
var connectaccueil=document.querySelector("#ins");
var inscracceuil=document.querySelector("#inscr");
var connectpage=document.querySelector("#connect");
var transitionpage=document.querySelector("#transition");
var boitemessage=document.querySelector("#fenetre");
var interface=document.querySelector(".interface");
var ajoutcontact= document.querySelector(".ajoutercontact");
var profil=document.querySelector(".Profil");
var suppr=document.querySelector('.supprimercontact');
var chatspage= document.querySelector('.chats');
var notifpage= document.querySelector('.notification');


//Gestion de l'état, et de l'id de connexion
var etat=""
var id;
var monpseudo;

//Gestion des audios
var audiointerface = new Audio("https://qmefxg.bn.files.1drv.com/y4mu2Kjs-kRj-c1WOMWQ6iO4yDXWpk3wsFRZcL4nDTFTQxpkjaN6WWp75GXIrCKtB7oKJJBZftS_-vkqZlw35rT-WtpvHvNXFoZ3bI_kGo9WvrT29kitj8VK2M1tnlZz8kRlvLB9c4m5JBFwZqu1s6XRMEkzjBUdK9aOxRy92aWD_HgP8sqIchsZ32-7yCUCONEIHJlIu-hHPS6IBM0VlGnHA?");
var audioerreur = new Audio("https://q2efxg.bn.files.1drv.com/y4mkaDePtvnQlZppBUN19wiYw1FGw2tu-CNFsqVxn4a6P4cmBbfmrLWXOaB9fv9cFIVE6zR_dRPMbfxHv-6uE8gEB3Uggm4-E4ul-r43HuJnhWuYL9aFpwXCJQ-YHuiHY7Z0hxKs07iPs8_9PH2BtlN430gfNFCh6z-xV0UsIZhJHw_0on1WZLcrtodtpRtbvhRxZ2jheR3sfkS9DfRfC2qCA?");
var audiomanque= new Audio("https://opytda.bn.files.1drv.com/y4mZOZAOwV76qhWTHK4A1Z6MXDX85OiS9oJbzdmq3JvKxjs3k38Jru2MFZGyLRsxUXFN50jECPoQwFB5Y961u70LABk-Ep6FCJdrWx14_zlCp8jOVykHtZ6hQZ1Ts2XR8BHYI6T3N2ywAozZ6mpEnMs3CLYnmTUlN0MTRuOiS4LRApAWG2MN5YkyOIIsOlzrdY2ZiJcPeo3PN0PVetAQw991g?");
var notif= new Audio("https://rzpzoq.bn.files.1drv.com/y4mdoTtdrCuAOjmbip0H0XPd7LNwWPNYycACsteV4URH5iu5rR7eculzM_HpoUrm_1uYLbFyRlCMAa98yjPaCJTnQ4tQAIJW_rWtOf_G8wgwxWpcs4f7t4r2IbOIKwZwFExUMoLecHyWbmp62Ck-OAP02PKZwVJ479IJLvehOIWzGhWGPsr6G38Tm6imEaSEVar91RaLofoCjY5N7mfw1qhnA?");
var envoi=new Audio("https://rdpzoq.bn.files.1drv.com/y4mjVomx2Y8dYAmvyDZ3MB2erhTv7KFfGlkAd_neWkbt7iIaPxZ_PJna4eqyqbhAcP6q1F8ixosldJ9SF44lNI1hX2vPqAhDwvByrivQfcuAjXZmMqVpEbryejQ4HA62GU7A0IwCN2oEhYQsK86Kek10784oFew8Q4rcqPyWNnKibLRTQzroWrLRDbuC5b10Xofi2BmnQ9bulJqmsgotBAJYg?");
audiointerface.volume = 0.4;
audioerreur.volume = 0.4;
audiomanque.volume = 0.4;
notif.volume = 0.4;
envoi.volume = 0.4;

//Tableau des messages, sauvegarde des messages dans un tableau des relations
var tableaumessages={}


// Le bouton reload qui déconnecte l'utilisateur
const reloadButton = document.querySelector(".reload");
reloadButton.addEventListener("click", function() {location.reload();});



// Afficher la fenêtre d'inscription
function inscr(){
    audiointerface.play();
    etat="Inscription"
    connectaccueil.style.display="None";
    inscracceuil.style.display="flex";


}

// Afficher la fenêtre de connexion
function connect(){
    audiointerface.play();
    etat="Connexion";
    connectaccueil.style.display="None";
    connectpage.style.display="flex";
}

//Le bouton retour et ses differentes conditions
function retour(){
    if (etat=="Inscription"){
        connectaccueil.style.display="flex";
        inscracceuil.style.display="None";
    }
    else if (etat=="Connexion"){
        connectaccueil.style.display="flex";
        connectpage.style.display="None";
    }
    else if (etat=="Ajouter"){
        interface.style.display="flex";
        ajoutcontact.style.display="none";
        etat="Connecte";
    }
    else if(etat=="Connecte"){
        document.querySelector("#quitter").style.display="flex";
    }
    else if (etat=="Profil"){
        interface.style.display="flex";
        profil.style.display="none";
        etat="Connecte";
    }
    else if (etat=="Supprimer"){
        interface.style.display="flex";
        suppr.style.display="none";
        etat="Connecte";
    }
}
//Gestion du bouton retour, celui qui permet de se déconnecter de sa session
function pasquitter(){
    document.querySelector("#quitter").style.display="none"
}


//Fenêtre de transition après l'inscription et passage automatique à la fenêtre de connexion
function Transition(){
    inscracceuil.style.display="None";
    transitionpage.style.display="flex";
    setTimeout("transitionpage.style.display='none';connect()",5*1000);
}


//Le bouton 'ok' pour l'inscription
function insok(){
    email=document.querySelector(".mail").value
    pseudo=document.querySelector(".pseudo").value
    try{
        if ((email)&&(pseudo)){
            fetch("https://trankillprojets.fr/wal/wal.php?inscription&identite="+pseudo+"&mail="+email)
            Transition();
            audiointerface.play();
        }
        else{

            throw new Error("Une zone de saisie n'a pas été remplie.");
        }
    }catch(Error){
        console.log(Error)
        audiomanque.play();
        document.querySelector(".Erreur").textContent="Remplissez toutes les zones de saisies."
    }
    
    console.log(document.querySelector(".mail").value);
}
function lanotif(nom){
    document.querySelector('.nomdenotif').textContent=nom;
    notifpage.style.display="block";
    setTimeout(function() {
        notifpage.style.display = "none";
      }, 3000);
}

//Le bouton 'ok' pour la connexion
function connectok(){
    id=document.querySelector(".identifiant").value
    try{
        if(id){
            fetch("https://trankillprojets.fr/wal/wal.php?information&identifiant="+id).then(reponse => reponse.json())
            .then(json => {
            if(json.etat.reponse==1){
                console.log('Connexion établie')
                document.querySelectorAll(".Erreur")[1].textContent="Connexion établie."
                setTimeout("boitemess()",1000);
                }
            else if(json.etat.reponse==0){
                throw new Error("Identifiant inexistant")
            }
            })
            .catch(Error=>{console.log(Error);document.querySelectorAll(".Erreur")[1].textContent="Identifiant inexistant";audioerreur.play();});
        }
        else{
            throw new Error("Saisie incomplète.")
        }
    }catch{
        audiomanque.play();
        document.querySelectorAll(".Erreur")[1].textContent="Remplissez toutes les zones de saisies."
    }


}


//La fonction d'affichage des contacts, récurssive
var listeactu;
function actucontact(){
    fetch("https://trankillprojets.fr/wal/wal.php?relations&identifiant="+id).then(reponse => reponse.json())
    .then(json => {
        
        if(json.etat.reponse==1){ 
            if (listeactu!=json.relations.length){
                document.querySelector('.contact').innerHTML=""
            }
            if (json.relations.length!=0){
            for (let i=0;i<json.relations.length;i++){
                if (document.getElementsByName(json.relations[i].relation).length==0){
                    document.querySelector('.contact').innerHTML+="<LI><button class='toutcontact' name="+json.relations[i].relation+" onclick='discu("+json.relations[i].relation+")'>"+json.relations[i].identite+"</button></LI>"
                }    
            }
            listeactu=json.relations.length;
        }
        
            else{
                document.querySelector('.contact').innerHTML='Liste vide'}
            }}) .catch(Error=>{console.log(Error)});
    
    setTimeout("actucontact()",2000);

}

//La fonction reliée au bouton pour consulter son profil
function consulterinfo(){
    etat="Profil";
    ajoutcontact.style.display="none";
    interface.style.display="none";
    suppr.style.display="none";
    
    profil.style.display="flex";

    fetch("https://trankillprojets.fr/wal/wal.php?information&identifiant="+id).then(reponse => reponse.json())
    .then(json => {
        if(json.etat.reponse==1){
        document.querySelector(".infopseudo").textContent=json.identite;
        document.querySelector(".infomail").textContent=json.mail;
        document.querySelector(".infoident").textContent=json.identifiant;}
        else{
            throw new Error("Erreur")
        }}).catch(Error=>{console.log(Error)});
    
}

//Affichage de la fenêtre de suppression de contact
function supprcontact(){
    etat="Supprimer"
    interface.style.display="none";
    profil.style.display="none"
    ajoutcontact.style.display="none";
    suppr.style.display="flex";
    document.querySelectorAll(".info")[1].textContent=""
}

//Récupère si c'est une relation ou une adresse mail, et supprime le contact
function supprimer(){
    let choix= document.getElementsByName("maliste")[0].value
    let entree=document.querySelector(".suprimerentre").value;
    try{
        if ((choix==1)&&(entree)){
            fetch("https://trankillprojets.fr/wal/wal.php?delier&identifiant="+id+"&mail="+entree).then(reponse => reponse.json())
            .then(json => {
            if(json.etat.reponse==1){
                console.log('Liaison établie')
                document.querySelectorAll(".info")[1].textContent="Suppression effectuée.";
                setTimeout("retour()",1000);
                }
            else if(json.etat.reponse==0){
                throw new Error("Adresse mail inexistante");
            }
            })
            .catch(Error=>{console.log(Error);document.querySelectorAll(".info")[1].textContent="Adresse mail inexistante"});
        }
        else if((choix==2)&&(entree)){
            fetch("https://trankillprojets.fr/wal/wal.php?delier&identifiant="+id+"&relation="+entree).then(reponse => reponse.json())
            .then(json => {
            if(json.etat.reponse==1){
                console.log('Liaison établie')
                document.querySelectorAll(".info")[1].textContent="Suppression effectuée.";
                setTimeout("retour()",1000);
                }
            else if(json.etat.reponse==0){
                throw new Error("Identifiant de relation inexistant");
            }
            })
            .catch(Error=>{console.log(Error);document.querySelectorAll(".info")[1].textContent="Identifiant de relation inexistant"});
        

        }
        else{
            throw new Error("Saisie incomplète.")
        }
    }catch(Error){
        audioerreur.play();
        document.querySelectorAll(".info")[1].textContent="Remplissez toutes les zones de saisies."
    }

}


//Affichage de la fenêtre d'ajout des contacts
function addnewcontact(){
    etat="Ajouter"
    interface.style.display="none";
    profil.style.display="none"
    suppr.style.display="none";
    ajoutcontact.style.display="flex";
    document.querySelectorAll(".mail")[1].value=""
    document.querySelector(".info").textContent=""; 
}

//Bouton 'ajouter' qui récupère l'adresse mail
function ajouter(){
    let mailautre=document.querySelectorAll(".mail")[1].value;
    try{
        if ((id)&&(mailautre)){
            fetch("https://trankillprojets.fr/wal/wal.php?lier&identifiant="+id+"&mail="+mailautre).then(reponse => reponse.json())
            .then(json => {
            if(json.etat.reponse==1){
                console.log('Liaison établie')
                document.querySelector(".info").textContent="Liaison établie.";
                setTimeout("retour()",1000);
                }
            else if(json.etat.reponse==0){
                throw new Error("Identifiant inexistant");
            }
            })
            .catch(Error=>{console.log(Error);document.querySelector(".info").textContent="Identifiant inexistant"});
        }
        else{
            throw new Error("Saisie incomplète.")
        }
    }catch(Error){
        audioerreur.play();
        document.querySelector(".info").textContent="Remplissez toutes les zones de saisies."
    }
}

//La fonction qui affiche la fenêtre de chat et qui initialise l'actualisation des contacts
function boitemess(){
    etat="Connecte"
    connectpage.style.display="none";
    boitemessage.style.display="flex";

    consulterinfo();
    retour();
    actucontact();
    actumess();

}

//Fonction affilié au bouton dans la liste des contacts, qui affiche le chat lié au contact choisi et affiche le nom et la relation en haut de la fenêtre de chat
//Fonction qui actualise les messages toutes les demi-secondes
//La variable reload stocke le setInterval qui permet l'actualisation, elle s'arrête quand l'utilisateur change de contact
var reload;
var interlocuteur= new Array();
function discu(ide){
    if (reload){
        clearInterval(reload);
    }
    document.querySelector(".barredecriture").style.display="block";
    interlocuteur=[document.getElementsByName(ide)[0].textContent,ide];
    document.querySelector('.chatactu').innerHTML="<img src='https://cdn-icons-png.flaticon.com/512/17/17004.png' style='width:8%'> "+document.getElementsByName(ide)[0].textContent+" - "+ide;
    document.querySelector('.chats').innerHTML="";

    reload=setInterval("afficheMess("+ide+")",0.3*1000);
    
}


//Affichage des messages
function afficheMess(ide){
    if (tableaumessages[ide].length!=0){
        document.querySelector('.chats').innerHTML=""
        for (let i=0; i<tableaumessages[ide].length;i++){
                if (tableaumessages[ide][i][0].identite==interlocuteur[0]){
                    document.querySelector('.chats').innerHTML+="<div class='bullesinterloc'>"+tableaumessages[ide][i][0].message+"</div>";
                }
                else{
                    document.querySelector('.chats').innerHTML+="<div class='bulles'>"+tableaumessages[ide][i][0].message+"</div>";
                }
                
        }
    }
    document.querySelector('.chats').scrollTop = document.querySelector('.chats').scrollHeight;
    

}


//Fonction qui permet de stocker tout les messages même n'étant pas dans la discussion concernée
function actumess(){
    if (document.getElementsByClassName('toutcontact').length!=0){
        for (let i=0;i<document.getElementsByClassName('toutcontact').length;i++){
            if (tableaumessages[document.getElementsByClassName('toutcontact')[i].name]){
                
    }else{
        tableaumessages[document.getElementsByClassName('toutcontact')[i].name]=new Array();
        }
    }
    }
    
    for (let i=0;i<document.getElementsByClassName('toutcontact').length;i++){
        try{
            let ideactu=document.getElementsByClassName('toutcontact')[i].name;
        fetch("https://trankillprojets.fr/wal/wal.php?lire&identifiant="+id+"&relation="+ideactu).then(reponse => reponse.json())
                .then(json => {
                if(json.etat.reponse==1){
                    if (json.messages.length!=0){
                        if (tableaumessages[ideactu].length!=0){
                            if (json.messages!=tableaumessages[ideactu][tableaumessages[ideactu].length-1][0]){
                            tableaumessages[ideactu].push(json.messages);
                            }
                        }
                        else{
                            tableaumessages[ideactu].push(json.messages);
                        }
                        if (tableaumessages[ideactu][tableaumessages[ideactu].length-1][0].identite!=document.querySelector(".infopseudo").textContent){
                            notif.play();
                            if (tableaumessages[ideactu][tableaumessages[ideactu].length-1][0].identite!=interlocuteur[0]){
                                lanotif(tableaumessages[ideactu][tableaumessages[ideactu].length-1][0].identite);
                            }
                            
                        }
                        
                        
                        }
                    }
                else if(json.etat.reponse==0){
                    throw new Error("Connexion perdu");}
                    }).catch(Error=>{console.log(Error);})
    }catch{
        console.log("Une erreur est survenu dans l'affichage des messages");
    }
    }
    setTimeout("actumess()",0.5*1000);
}




//Fonction lié au bouton 'send' dans la fenêtre de chat
function sendmessage(){
    let texte=document.querySelector('.ecriremessage').value;
    try{
        if (texte){
            fetch("https://trankillprojets.fr/wal/wal.php?ecrire&identifiant="+id+"&relation="+interlocuteur[1]+"&message="+texte).then(reponse => reponse.json())
            .then(json => {
            if(json.etat.reponse==1){
                console.log('Message envoyé')
                document.querySelector('.ecriremessage').value=""
                envoi.play();
                }
            else if(json.etat.reponse==0){
                throw new Error("Echec d'envoi");
            }
            })
            .catch(Error=>{console.log(Error)});
        }
        else{
            audiomanque.play()
            throw new Error("Aucun texte à envoyer.")
        }
    }catch(Error){
        console.log(Error);
    }
    
}
