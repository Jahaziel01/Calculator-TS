import { useEffect, useState } from "react";
import { NUMBERS, OPERATORS, ACTIONS } from "./constans";
import { Data, Display } from "./types";
import useCalculator from "./hooks/useCalculator";
import {
  Circle_1, Circle_2, BoxBlur, CircleGradient, Calculator, BtnHistory, Screen,
  SecondScreen, MainScreen, Buttons, Button
} from "./components/ui";
import TextBox from "./components/TextBox";
import History from "./components/History";
import histoy from "./assets/history.svg"


export default function App() {

  const [display, setDisplay] = useState<Display>({ main: "", second: "" });
  const [data, setData] = useState<Data>({ num1: "", operator: "", num2: "" });
  const [toogleHistory, setToogleHistory] = useState<boolean>(false);

  const { removeLastNumber, calculate, formatedNumber, saveDataLS, } = useCalculator();

  const dataLength = Object.values(data).join("").length;

  useEffect(() => {
    const updatedData = { ...data };

    if (!updatedData.num1) {
      updatedData.num1 = "0";
    }

    if (updatedData.num1.startsWith("0") && updatedData.num1.length === 2) {
      updatedData.num1 = updatedData.num1.substring(1);
    }

    if ((updatedData.num1.endsWith(".") || updatedData.num2.endsWith(".")) && updatedData.operator) {
      if (updatedData.num1.endsWith(".")) {
        updatedData.num1 = updatedData.num1.slice(0, -1);
      }
      if (updatedData.num2.endsWith(".")) {
        updatedData.num2 = updatedData.num2.slice(0, -1);
      }
    }

    setDisplay({
      ...display,
      main: `${formatedNumber(updatedData.num1)} ${updatedData.operator} ${formatedNumber(updatedData.num2)}`
    });
  }, [data]);

  const handleClickNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    const number = e.currentTarget.value;

    const updatedData = { ...data };

    if (!data.operator) {
      updatedData.num1 = data.num1 + number;
    } else {
      updatedData.num2 = data.num2 + number;
    }
    setData(updatedData);
  };

  const handleClickOperator = (e: React.MouseEvent<HTMLButtonElement>) => {
    const operator = e.currentTarget.value;

    const updatedData = { ...data };

    updatedData.operator = operator;
    setData(updatedData);
  };

  const handleClickAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.value;

    const updatedData = { ...data };
    const updatedDisplay = { ...display };

    switch (action) {
      case ".": {
        if (!data.num1.includes(".")) {
          updatedData.num1 = data.num1 + action;
        } else if (!data.num2.includes(".") && data.operator) {
          updatedData.num2 = data.num2 + action;
        }
        setData(updatedData);
      };
        break;

      case "=": {
        const result = calculate(data);
        updatedDisplay.second = updatedDisplay.main;
        updatedDisplay.main = result;

        updatedData.num1 = result;
        updatedData.operator = "";
        updatedData.num2 = "";

        setData(updatedData);
        setDisplay(updatedDisplay);

        const dataLS = `${data.num1} ${data.operator} ${data.num2} = ${result}`;
        saveDataLS(dataLS);
      };
        break;

      case "C": {
        const result = removeLastNumber(data);
        setData(result);
      };
        break;

      case "AC":
        setData({ ...data, num1: "", operator: "", num2: "" });
        setDisplay({ main: "", second: "" })
        break;
      default: { };
    };
  }

  const handleToogleHistory = (): void => {
    setToogleHistory(!toogleHistory);
  };

  const { main, second } = display;

  return (
    <main className="w-11/12 h-[650px] mx-auto mt-14 sm:w-10/12 sm:flex justify-between gap-3">
      <TextBox />
      <CircleGradient>
        <Calculator className="calculator">
          <BoxBlur />
          <BtnHistory onClick={handleToogleHistory}>
            <img src={histoy} alt="icon-histoy" width={25} height={25} />
          </BtnHistory>
          <Screen>
            <SecondScreen>{second}</SecondScreen>
            <MainScreen $operator={dataLength > 9 && data.operator ? true : false} >
              {main}
            </MainScreen>
          </Screen>
          {toogleHistory ? <History />
            :
            <Buttons>
              {NUMBERS.map((number) => (
                <Button
                  key={number}
                  value={number}
                  onClick={handleClickNumber}
                  className="bg-slate-700 opacity-90 hover:bg-gray-800"
                >
                  {number}
                </Button>
              ))}
              {OPERATORS.map((operator) => (
                <Button
                  key={operator}
                  value={operator}
                  onClick={handleClickOperator}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  {operator}
                </Button>
              ))}
              {ACTIONS.map((action) => (
                <Button
                  key={action}
                  value={action}
                  onClick={handleClickAction}
                  className="bg-slate-700 opacity-90 hover:bg-gray-800"
                >
                  {action}
                </Button>
              ))}
            </Buttons>
          }
        </Calculator>
      </CircleGradient>
      <Circle_1 />
      <Circle_2 />
    </main >
  )
}
