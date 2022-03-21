# Flickr Gallery
Detta är en hemsida som visar bilder från flickrs API. 
Här nedan finns information för hur man kör igång allting.

Först och främst måste mitt egenbyggda API köras igång. Detta hittar du här: https://github.com/AlbinFrick/FlickrAPI.
Installera det och kör igång och återkom sedan hit.

## Installation

Installera alla paket för sidan. 

```bash
npm install
```
eller

```bash
yarn
```

## Användning


För att fortsätta utveckla siten använd:
```bash
npm run dev 
```
eller 

```bash
yarn dev
```

Detta startar en utvecklings server på `http://localhost:3000`. När du ändrar något i koden kommer sidan att [hot reload](https://stackoverflow.com/questions/41428954/what-is-the-difference-between-hot-reloading-and-live-reloading-in-react-native):a. Alltså startar appen inte om när ändringar görs. 

För att bygga en optimerad version av sidan använd:

```bash
npm run build 
```
eller 

```bash
yarn build 
```
Detta bundlar ihop alla filer och läggs i `dist/`. För att köra den bygda sidan öppna `dist/index.html` i din webbläsare.

## Klart
Nu är det bara att söka och kika på alla bilder som flickr har att erbjuda. 
