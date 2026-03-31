## Lijst
[Installatie](#installatie)

[SCSS](#scss)
- [Structuur](#structuur)
- [Classes](#classes)
- [Variables](#variables)
- [Mixins](#mixins)
- [Mediaqueries](#mediaqueries)

<br/>

[React](#react)
- [Structuur](#structuur-1)

## Installatie
Zet Docker alvast aan en clone dan het project door het volgende command te draaien:

 ```git
 git clone "https://github.com/lunahilly/Examen-Opendag"
```

> [!IMPORTANT]
> Zorg er altijd voor dat je dit niet in je OneDrive doet. Als je dit wel doet dan krijg je dezelfde problemen die we de vorige keer ook hadden.

Open dit in je Visual Studio Code en open je cmd (Command Prompt) terminal. Navigeer naar de juiste map als je dit nog niet gedaan had en run dan het volgende command: ```composer require laravel/installer --dev```. Het kan best een tijdje duren voor het klaar is met dit command, afhankelijk van je laptop. 

Het kan zijn dat er allemaal teksten met gele achtergrond wordt getoont maar dat is oke. Wanneer dit command klaar is en geen errors terug geeft (naast de gele teksten dan), runnen we het volgende command in dezelfde temrinal: ```composer update```. 

Ook deze kan even duren maar als alles goed gaat dan moeten er nu geen warnings meer zijn (de gele teksten). Check of er een nieuwe map is verschenen met de naam ```vendor```. Als dit zo is dan zijn de eerste stappen gelukt.
Als het goed is staat er nog geen ```.env``` file tussen je bestanden dus deze moet je zelf aanmaken. Wat er in moet staan staat in de WhatsApp groep.

Zodra je dit hebt aangemaakt en de inhoud hebt toegevoegd, kan je nu de ```Ubuntu WSL``` terminal openen. Controleer eerst of je in de juiste map zit, als dit zo is kan je het volgende command runnen in de terminal: ```./vendor/bin/sail up```.

Als alles goed is gegaan dan hoort nu in Docker het project te draaien.

Nu terug in je VSCode ga je weer naar de cmd terminal en run je nu het volgende command: ```npm install```. Nadat dit succesvol is voltooid kun je ```npm run dev``` runnen en is alles aan de React kant geinstalleerd.

Als je localhost hebt geopent kan het zijn dat er een error wordt weergegeven. Dit is omdat er nog niets in de database staat maar de localhost verwacht dit wel. Om dit op te lossen moet je naar je Docker gaan, het project uitklappen en op ```laravel.test-1``` drukken. Ga dan naar ```Exec``` en daar moet een terminal te zien zijn.

Run daar het volgende command: ```php artisan migrate```. Zodra je dit hebt gedaan kun je je localhost refreshen en als het goed is, is de error verdwenen. Om zeker te weten dat de migratie is gelukt kun je naar ```localhost:1088``` gaan en daar kijken of tabellen zijn aangemaakt bij ```laravel```.


## SCSS

Om de SCSS te runnen moet je eerst het volgende command in je cmd (Command Prompt) draaien.

Navigeer eerst naar de goede map (opendag).

```cmd
sass resources/scss/style.scss resources/css/app.css --watch
```

<br/>

Een nieuw SCSS bestand linken aan het project doe je door eerst naar het bestand ```style.scss``` te gaan en daar (op een plek die volgens jou logisch is) het bestand op te halen op deze manier:

```scss
@use "components/{map-naam}/{bestand-naam}"
```

<br/>

### Structuur
In de ```scss``` map staan een aantal mappen: base, abstracts, components, pages, layout.

```
scss/
|- abstracts/
|   |- _mediaqueries.scss
|   |- _mixins.scss
|   |- _variables.scss
|
|- base/
|   |- _base.scss
|   |- _reset.scss
|
|- components/
|   |- _checkbox.scss
|   ...
|   
|- layout/
|   |- _header.scss
|   ...
|   
|- pages/
|   |- _welcome.scss
|   ...
|
|- style.scss
```

1. Base
    - Hierin staan de reset en base bestanden
2. Abstracts
    - Hier staan de variables, mixins en mediaqueries.
3. Components
    - Hier staan alle component bestanden, dus bijvoorbeeld buttons, input velden etc.
4. Pages
    - Hier staan alle scss bestanden van de pages, zoals bijvoorbeeld home.
5. Layout
    - Hier staan al de layout bestanden, bijvoorbeeld header, footer maar ook forms of navigation etc. Het is dus vooral voor de stukken die op (bijna) elke pagina hetzelfde zijn bijvoorbeeld.

<br/>

### Classes
Voor de class namen maken we gebruik van de BEM methode. En we doen dit in het Engels.

Bijvoorbeeld zo:
```html
<div class="box">
    <h2 class="box__title">Box name</h2>
    <span class="box__actions">
        <button class="box__actions--button">button</button>
        <a href="" class="box__actions--link">link</a>
    </span>
</div>
```

We doen dit op deze manier zodat we duidelijke class namen krijgen en goed met SCSS kunnen werken.
De SCSS ziet er dan bijvoorbeeld zo uit:

```scss
.box{
    background: red;

    &__title{
        font-size: 2em;
    }

    &__actions{
        display: flex;

        &--button{
            border: none;

            &:focus{
                outline: none;
            }

            &:hover{
                cursor: pointer;
            }
        }

        &--link{
            text-decoration: none;
        }
    }
}
```

<br/>

### Variables

Als je een kleur moet gebruiken dan gebruiken we de variabelen in de file ```_variables.scss```. In dit bestand kan je zoeken naar de kleur die je wilt gebruiken en kijken in welke map deze zit. 

Als het om kleuren gaat dan zit deze meestal in de ```$colors:```. Nu moet je alleen de naam van de variabele onthouden (of kopiëren) en dan kun je hem gebruiken door hem zo op te roepen: 

``` scss
&--button{
    background: map-get(variables.$colors, "variable-name");
}
```

Hetzelfde geldt voor bijvoorbeeld borders, padding, en andere mogelijke variables.

> [!TIP] 
> Zorg er eerst altijd voor dat het variables bestand boven aan jouw bestand gelinkt staat. Als dit niet het geval is dan kun je hem linken op de volgende manier:
>
> ``` scss
> @use "../abstracts/variables";
> ```
>
> Als het path niet klopt dan kun je deze natuurlijk aanpassen.

<br/>

### Mixins
Als je soms merkt dat je steeds dezelfde stukken code schrijft zoals bijvoorbeeld: 


```scss
&__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Dan kun je van dit stuk een mixin maken en blijven hergebruiken zonder de hele tijd hetzelfde over en over te typen.

```scss
@mixin flexBox{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Nu kan je dit makkelijk gebruiken in een andere file op de volgende manier:

```scss
&--button{
    @include mixins.flexBox;
}
```

Ook kan je parameters meegeven aan mixins. Dus stel je voor je hebt een mixin maar de color moet soms anders zijn of de maat dan kan je daar de parameters voor gebruiken op de volgende manier:

```scss
@mixin changeColor($color){
    background: $color;
}
```

Je kunt dit dan oproepen en een variable meegeven op deze manier:

```scss
&__wrapper{
    @include mixins.changeColor(map-get(variables.$colors, "pink"));
}
```

> Dit kan ook met maten etc.

> [!IMPORTANT]
> Zorg er opnieuw wel voor dat het mixins bestand boven aan jouw bestand gelinkt staat. Zie bij de TIP van [variables](#variables) hoe dit moet.

<br/>

### Mediaqueries

Alle mediaqueries gaan in de ```_mediaqueries.scss``` file. Deze moet altijd onderaan in de ```style.scss``` staan anders kan de code overschreven worden wat er voor kan zorgen dat de mediaqueries niet meer gaan werken of niet correct meer werken.

<br/>
<br/>


## React
> [!IMPORTANT]
> Vergeet niet om ```npm run dev``` te runnen voor je begint met programmeren. En als het niet werkt check dan of je wel in de juiste map zit.

```
/usr/bin/env: ‘bash\r’: No such file or directory 
/usr/bin/env: use -[v]S to pass options in shebang lines composer
```

### Structuur
In de ```js``` map staan een aantal mappen:

```
js/
|- Components/
|       |- Checkbox.jsx
|       ... # components zoals buttons, inputfields etc.
|
|- Layouts/
|       |- AuthenticatedLayout.jsx
|       |- GuestLayout.jsx
|       |- Navigation.jsx
|
|- Pages/
|       |- Home/
|       |    |- Home.jsx
|       ...
|       |
|       |- Welcome.jsx
|
|- app.jsx
```


### Routing
nog mee bezig