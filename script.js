async function searchPokemon(){
const input=document.getElementById('pokemonInput').value.trim().toLowerCase();
const resultDiv=document.getElementById('pokemonResult');

resultDiv.innerHTML='';

if(!input){
    resultDiv.innerHTML='<p class="error">Please enter a Pokemon name!</p>';
    return;
}

//Fetch Pokemon data from PokeAPI
try{
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok){
        throw new Error('Pokemon not found');
    }
    const data= await response.json();

    //Extract Data
    const name= data.name;
    const image=data.sprites.front_default;
    const id=data.id;
    const types=data.types.map(type => type.type.name).join(', ');

    //Display Pokemon Information
    resultDiv.innerHTML=`
    <h2>${name}</h2>
    <image src="${image}" alt="${name}">
    <p><strong>ID:</strong>${id}</p>
    <p><strong>Type:</strong>${types}</p>`;
}catch(error){
    resultDiv.innerHTML=`<p class="error">Pokemon"${input}"not found.Please try another Name!`;
}
}

//Pressing Enter to trigger search
document.getElementById('pokemonInput').addEventListener('keypress', function(event){
    if(event.key==='Enter'){
        searchPokemon();
    }
})