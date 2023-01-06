export default interface PokemonDataType {
  ID: number|string;
  name: string;
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  png: string;
}

export const PokemonDataInit = 
  {
    ID: 1,
    name: "",
    HP: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    png: "",
  }
;