import { useEffect, useState } from "react";
import Image from "next/image";
import PokemonDataType, { PokemonDataInit } from "../src/types/pokemonFetch";
import { GetWindowSize } from "../src/modules/GetWindowSize";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Home() {
  const WindowSize = GetWindowSize();
  const lists = [1, 2];
  const [pokemonData, setPokemonData] =
    useState<PokemonDataType[]>(PokemonDataInit);

  const [ChartData, setChartData] = useState({
    labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  const handleClick = async (index: number) => {
    handleFetch(pokemonData[index].ID);
  };
  const handleFetch = async (ID: string | number) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        const stats = data.stats;
        console.log(stats);
        const HP: number = stats[0].base_stat;
        const attack: number = stats[1].base_stat;
        const defense: number = stats[2].base_stat;
        const special_attack: number = stats[3].base_stat;
        const special_defense: number = stats[4].base_stat;
        const speed: number = stats[5].base_stat;
        const name: string = data.forms[0].name;
        const png: string = data.sprites.front_default;
        const stats_json = {
          ID,
          name,
          HP,
          attack,
          defense,
          special_attack,
          special_defense,
          speed,
          png,
        };
        setPokemonData(stats_json);
        const chartData = {
          labels: ["体力", "攻撃", "防御", "特殊", "特防", "素早さ"],
          datasets: [
            {
              label: `${ID} ${stats_json.name}`,
              data: [
                stats_json.HP,
                stats_json.attack,
                stats_json.defense,
                stats_json.special_attack,
                stats_json.special_defense,
                stats_json.speed,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        };
        // @ts-ignore
        setChartData(chartData);

        console.log(stats_json);
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  };
  useEffect(() => {
    console.log(pokemonData[0].ID)
  })
  return (
    <>
      {/* <div style={{ MaxWidth: "100%" }}>
        <div style={{ float: "left", maxWidth: "50%" }}>
          <button onClick={handleClick}>検索</button>
          <input
            type="string"
            value={pokemonData.ID}
            onChange={(e) => {
              setPokemonData({ ...pokemonData, ID: e.target.value });
            }}
          />
          <div style={{}}>
            <Image
              src={pokemonData.png}
              alt={pokemonData.name}
              width={WindowSize.width / 2}
              height={WindowSize.width / 2}
            /></div>
          <Radar data={ChartData} />

        </div>
        <div style={{ float: "right", width: "50%" }}>
          <button onClick={handleClick}>検索</button>

          <input
            type="string"
            value={pokemonData.ID}
            onChange={(e) => {
              setPokemonData({ ...pokemonData, ID: e.target.value });
            }}
          />
          <div style={{}}>
            <Image
              src={pokemonData.png}
              alt={pokemonData.name}
              width={WindowSize.width / 2}
              height={WindowSize.width / 2}
            /></div>
          <Radar data={ChartData} />
        </div>
      </div> */}

      <div className="carousel  w-full">
        {lists.map((list, index) => {
          return (
            <div className="carousel-item w-1/2" key={index}>
              <div>
                <button onClick={(list) => { handleClick(index) }}>検索</button>
                <input
                  type="string"
                  value={pokemonData[0].ID}
                  onChange={(e) => {
                    setPokemonData({ ...pokemonData[list], ID: e.target.value });
                  }}
                />
                <div style={{}}>
                  <Image
                    src={pokemonData[0].png}
                    alt={pokemonData[0].name}
                    width={WindowSize.width / 2}
                    height={WindowSize.width / 2}
                  />
                </div>
                <Radar data={ChartData} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
