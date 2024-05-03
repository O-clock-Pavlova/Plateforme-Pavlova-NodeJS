const express = require("express");
const app = express();
const { repliques } = require("./bdd/replique");

//page d'accueil
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/html/accueil.html`);
});

// Indiquez le nom de la ou les personne(s) : widi
// app.get → page des films (liste des films)
app.get("/films", function (req, res) {
    res.send(
        `
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Répliques</title>
            <style>h1{color:orange;}</style>
        </head>

        <body>
            <h1>Répliques des films/séries</h1>
            <ul>${repliques
                .map(
                    (replique) =>
                        `<li>
                    <a href="/repliques/film/${replique.location}" title="Titre du film">
                        ${replique.location}
                    </a>
                </li>`
                )
                .join("")}</ul>
        </body>
    </html>`
    );
});

// Indiquez le nom de la ou les personne(s) : Thomas
// app.get → page des notations (liste des notations)
app.get("/notations", (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notations</title>
        <style>h1{color:red;}</style>
    </head>

    <body>
         <header>
               <h1>Liste des notations</h1>
         </header>

         <main>
             <ul>
                <li><a href="/repliques/notation/5">⭐⭐⭐⭐⭐</a></li>
                <li><a href="/repliques/notation/4">⭐⭐⭐⭐</a></li>
                <li><a href="/repliques/notation/3">⭐⭐⭐</a></li>
                <li><a href="/repliques/notation/2">⭐⭐</a></li>
                <li><a href="/repliques/notation/1">⭐</a></li>
            </ul>
        </main>

    </body>
</html>
    
    `);
});

// Indiquez le nom de la ou les personne(s) : Fabien x Sonia
// app.get → page des auteurs (liste des auteurs)

app.get("/auteurs", (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auteurs</title>
    <style>h1{color:blue;}</style>
</head>
<body>
    <h1>Liste des auteurs</h1>
    <ul>${repliques.map((replique) => `<li><a href="/repliques/auteur/${replique.author}">${replique.author}</a></li>`).join("")}</ul>
</body>
</html>`);
});

// Indiquez le nom de la ou les personne(s) : Dylan
// app.get → page des repliques (liste des repliques)
app.get("/repliques", (req, res) => {
    res.send(
        `<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Répliques</title>
            <style>h1{color:green;}</style>
        </head>
        <body>
        <h1>Liste des répliques</h1>
        <ul>${repliques
            .map(
                (replique) =>
                    `<li>
                    <a href="/repliques/replique/${replique.id}" title="${replique.content}">
                        ${replique.content}
                    </a>
                </li>`
            )
            .join("")}
        </ul>
        </body>
</html>`
    );
});

// Indiquez le nom de la ou les personne(s) : Matteo
// app.get → page d'une notation
app.get("/repliques/notation/:notation", (req, res) => {
    const searchedNotation = parseInt(req.params.notation);
    const repliquesFiltered = repliques.filter((replique) => replique.notation === searchedNotation);
    console.log(repliquesFiltered);
    if (repliquesFiltered) {
        res.send(
            `<!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Répliques</title>
                <style>h1{color:red;}</style>
            </head>
            <body>
            <h1>Repliques de notation ${searchedNotation}</h1>
            <ul>${repliquesFiltered
                .map((replique) => {
                    return `<li><a href="/repliques/${replique.id}">${replique.content}</a></li>`;
                })
                .join("")}</ul>
            </body>
            </html>`
        );
    } else {
        res.send("replique non trouvée");
    }
});

// Indiquez le nom de la ou les personne(s) : Oliva
// app.get → page d'un auteur
app.get("/repliques/auteur/:author", (req, res) => {
    const author = req.params.author;
    const filteredRepliques = repliques.filter((replique) => replique.author === author);
    if (filteredRepliques.length > 0) {
        res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Auteur</title>
            <style>h1{color:brown;}</style>
        </head>
        <body>
            <h1>Auteur : ${author}</h1>
            <ul>${filteredRepliques.map((replique) => `<li>${replique.content}</li>`).join("")}</ul>
        </body>
        </html>`);
    } else {
        res.send("Auteur non trouvé");
    }
});

// Indiquez le nom de la ou les personne(s) : Wendy |
// app.get → page d'un film
app.get("/repliques/film/:location", (req, res) => {
    const location = req.params.location;
    const filteredRepliques = repliques.filter((replique) => replique.location === location);

    if (filteredRepliques.length > 0) {
        res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Film</title>
            <style>h1{color:purple;}</style>
        </head>
        <body>
        <h1>Film : ${location}</h1>
            <ul>${filteredRepliques.map((replique) => `<li>${replique.content}</li>`).join("")}</ul>
        </body>
        </html>`);
    } else {
        res.send("Not found");
    }
});

// Indiquez le nom de la ou les personne(s) : Kevin || Sandrine
// app.get → page d'une replique
app.get("/repliques/replique/:id", (req, res) => {
    const id = Number(req.params.id);
    const replique = repliques.find((replique) => replique.id === id);
    if (replique) {
        res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Film</title>
            <style>h1{color:orange;}</style>
        </head>
        <body>
        <h1>Réplique : ${replique.content}</h1>
        <ul><li>Author ${replique.author}</li><li>Location ${replique.location}<li>Notation ${replique.notation}</li></ul>
        </body>
        </html>`);
    } else {
        res.send("Not found");
    }
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
