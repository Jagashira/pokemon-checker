import { useEffect, useState } from "react";
import Image from "next/image";
import BackgroundImage from "./../public/images/moroccan-flower.png";
import { ChartInit } from "../src/modules/ChartInit";

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
import PokemonDataType from "../src/types/pokemonFetch";
import { PokemonDataInit } from "../src/types/pokemonFetch";
import { clearPreviewData } from "next/dist/server/api-utils";
import { GetWindowSize } from "../src/modules/GetWindowSize";

export default function Home() {
  const WindowSize = GetWindowSize();
  console.log(WindowSize.width);

  const [pokemonData, setPokemonData] =
    useState<PokemonDataType>(PokemonDataInit);
  const [ChartData, setChartData] = useState(ChartInit);
  const handleClick = async (ID: number | string) => {
    handleFetch(ID);
  };
  const handleFetch = async (ID: string | number) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(JSON.stringify(data, null, 3))
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
          HP,
          attack,
          defense,
          special_attack,
          special_defense,
          speed,
          name,
          png,
        };
        // setPokemonData(stats_json);
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
        setPokemonData(stats_json);

        console.log(stats_json);
        console.log(pokemonData.png);

        return stats_json;
      });
  };
  const lists = [1, 2, 3];

  const chartOptions = {
    scales: {
      r: {
        max: 200,
        min: 0,
        ticks: {
          stepSize: 50
        },

      }
    }
  }

  return (
    <>
      <div
        className="carousel  w-full"
        style={{
          paddingTop: 70,
          backgroundImage: `url(${BackgroundImage}) `,
          backgroundRepeat: "repeat-y",
        }}
      >
        {lists.map((list, index) => {
          return (
            <div className="carousel-item w-1/2" key={index}>
              <div>
                <button
                  onClick={(list) => {
                    handleClick(pokemonData.ID);
                  }}
                >
                  検索
                </button>
                <input
                  type="string"
                  value={pokemonData.ID}
                  onChange={(e) => {
                    setPokemonData({ ...pokemonData, ID: e.target.value });
                    console.log(e.target.value);
                  }}
                />

                {pokemonData.png !== "" ? (
                  <Image
                    src={pokemonData.png}
                    alt={pokemonData.name}
                    width={WindowSize.width / 2}
                    height={WindowSize.width / 2}
                  />
                ) : null}

                {ChartData.datasets[0].data[0] !== 0 ? (
                  <Radar
                    data={ChartData}
                    options={chartOptions}
                    width={WindowSize.width / 2}
                    height={WindowSize.width / 2}
                  />
                ) : null}
                <t
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
