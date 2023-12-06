import { useState } from 'react';
import { Data } from '../types';

export default function useCalculator() {

    const [dataLS, setDataLS] = useState<string[]>(JSON.parse(localStorage.getItem("data") || "[]"));

    function saveDataLS(data: string) {
        localStorage.setItem("data", JSON.stringify([...dataLS, data]));
        setDataLS([...dataLS, data]);
    };

    function removeLastNumber(data: Data) {
        const newData: Data = { ...data };

        if (newData.num2) {
            newData.num2 = newData.num2.slice(0, -1);
        } else if (newData.operator) {
            newData.operator = newData.operator.slice(0, -1);
        }
        else if (newData.num1) {
            newData.num1 = newData.num1.slice(0, -1);
        }
        return newData;
    }

    function formatedNumber(number: string) {
        return number ? Number(number).toLocaleString("en-US") : "";
    }

    function convertToNumber(number: string) {
        if (number.includes(".")) {
            return parseFloat(number);
        } else {
            return parseInt(number);
        }
    }

    function calculate(data: Data) {
        let result = 0;

        const { num1, operator, num2 } = data;

        if (!num1) return num2;
        if (!num2) return num1;

        const newNum1 = convertToNumber(num1);
        const newNum2 = convertToNumber(num2);

        switch (operator) {
            case "+":
                result = newNum1 + newNum2;
                break;
            case "-":
                result = newNum1 - newNum2;
                break;
            case "*":
                result = newNum1 * newNum2;
                break;
            case "/":
                result = newNum1 / newNum2;
                break;
        };

        return (result % 1 === 0) ? result.toString() : result.toFixed(2);
    };

    const handleClearHistory = () => {
        localStorage.removeItem("data");
        setDataLS([]);
    }

    return {
        removeLastNumber,
        formatedNumber,
        calculate,
        dataLS,
        saveDataLS,
        handleClearHistory
    }
}
