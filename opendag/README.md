## Lijst
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
Zet Docker alvast aan en ```git clone "https://github.com/lunahilly/Examen-Opendag"``` in een folder en open dit in Visual Studio Code.



## SCSS

> [!IMPORTANT]
> We gebruiken geen pixels of rem maar em, we gebruiken vh alleen voor de screen height

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

