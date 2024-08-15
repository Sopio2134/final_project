import React from "react";

function App() {
    const [inputValue, setInputValue] = React.useState("");
    const [theme, setTheme] = React.useState(1);
    const [calculate, setCalculate] = React.useState({
        val: null,
        operator: null
    });

    React.useEffect(() => {
        document.addEventListener('keydown', keyPress, true);
        return () => {
            document.removeEventListener('keydown', keyPress, true);
        };
    }, []);

    // Color configuration
    const colors = {
        theme1: {
            body: "hsl(222, 26%, 31%)",
            screen: {
                background: "hsl(224, 36%, 15%)",
                color: "hsl(0, 0%, 100%)"
            },
            keypad: "hsl(223, 31%, 20%)",
            key: {
                background: "hsl(30, 25%, 89%)",
                shadow: "0px 3px hsl(28, 16%, 65%)",
                color: "hsl(221, 14%, 31%)"
            },
            delete: {
                background: "hsl(225, 21%, 49%)",
                shadow: "0px 3px hsl(224, 28%, 35%)"
            },
            eq: {
                background: "hsl(6, 63%, 50%)",
                shadow: "0px 3px hsl(6, 70%, 34%)",
                color: "white"
            },
            negative: {
                background: "hsl(348, 100%, 61%)",
                shadow: "0px 3px hsl(348, 100%, 50%)"
            }
        },
        theme2: {
            body: "hsl(0, 0%, 90%)",
            screen: {
                background: "hsl(0, 0%, 93%)",
                color: "hsl(60, 10%, 19%)"
            },
            keypad: "hsl(0, 5%, 81%)",
            key: {
                background: "hsl(45, 7%, 89%)",
                shadow: "0px 3px hsl(35, 11%, 61%)",
                color: "hsl(60, 10%, 19%)"
            },
            delete: {
                background: "hsl(185, 42%, 37%)",
                shadow: "0px 3px hsl(185, 58%, 25%)"
            },
            eq: {
                background: "hsl(25, 98%, 40%)",
                shadow: "0px 3px hsl(25, 99%, 27%)",
                color: "white"
            },
            negative: {
                background: "hsl(348, 100%, 61%)",
                shadow: "0px 3px hsl(348, 100%, 50%)"
            }
        },
        theme3: {
            body: "hsl(268, 75%, 9%)",
            screen: {
                background: "hsl(268, 71%, 12%)",
                color: "hsl(52, 100%, 62%)"
            },
            keypad: "hsl(268, 71%, 12%)",
            key: {
                background: "hsl(268, 47%, 21%)",
                shadow: "0px 3px hsl(290, 70%, 36%)",
                color: "hsl(52, 100%, 62%)"
            },
            delete: {
                background: "hsl(281, 89%, 26%)",
                shadow: "0px 3px hsl(285, 91%, 52%)"
            },
            eq: {
                background: "hsl(176, 100%, 44%)",
                shadow: "0px 3px hsl(177, 92%, 70%)",
                color: "hsl(198, 20%, 13%)"
            },
            negative: {
                background: "hsl(348, 100%, 61%)",
                shadow: "0px 3px hsl(348, 100%, 50%)"
            }
        }
    };


    const bodyStyle = {
        backgroundColor: colors[`theme${theme}`].body
    };

    const screenStyle = {
        backgroundColor: colors[`theme${theme}`].screen.background,
        color: colors[`theme${theme}`].screen.color,
        fontSize: inputValue.length > 21 ? "1.7em" : "2.7em"
    };

    const keypadStyle = {
        backgroundColor: colors[`theme${theme}`].keypad
    };

    const keyStyles = {
        backgroundColor: colors[`theme${theme}`].key.background,
        boxShadow: colors[`theme${theme}`].key.shadow,
        color: colors[`theme${theme}`].key.color
    };

    const deleteStyles = {
        backgroundColor: colors[`theme${theme}`].delete.background,
        boxShadow: colors[`theme${theme}`].delete.shadow,
    };

    const eqStyle = {
        backgroundColor: colors[`theme${theme}`].eq.background,
        boxShadow: colors[`theme${theme}`].eq.shadow,
        color: colors[`theme${theme}`].eq.color
    };

    const negativeStyle = {
        backgroundColor: colors[`theme${theme}`].negative.background,
        boxShadow: colors[`theme${theme}`].negative.shadow,
        color: "white"
    };

    //Functions

    function keyPress(e) {
        let nums = "0123456789"
        if (nums.includes(e.key)){
            setInputValue(prev => prev += e.key)
        }
    }

    function updateValue(val) {
        setInputValue(prev => prev += val)
    }

    function deleteValue() {
        setInputValue(prev => {
            let newval = prev.toString().slice(0, -1)
            return newval
        })
    }

    function handleCalculate(opr) {
        if (calculate.val === null){
            setCalculate({
                val: parseFloat(inputValue),
                operator: opr
            })
            setInputValue("")
        }else{
            setCalculate(prev => {
                return {...prev, operator: opr}}
            )
            if (calculate.operator === "+") {
                let result = calculate.val + parseFloat(inputValue)
                setCalculate(prev => {
                    return {operator: null, val: result}
                })
                setInputValue("")
            }else if (calculate.operator === "-") {
                let result = calculate.val - parseFloat(inputValue)
                setCalculate(prev => {
                    return {operator: null, val: result}
                })
                setInputValue("")
            } else if (calculate.operator === "*") {
                let result = calculate.val * parseFloat(inputValue)
                setCalculate(prev => {
                    return {operator: null, val: result}
                })
                setInputValue("")
            } else if (calculate.operator === "/") {
                let result = calculate.val / parseFloat(inputValue)
                setCalculate(prev => {
                    return {operator: null, val: result}
                })
                setInputValue("")
            }
        }
        
    }

    return(
        <div className="calculator-div" style={bodyStyle}>
            <div className="calculator-container">
                <div className="section-one" style={{color: screenStyle.color}}>
                    <p className="section-one-text">calc</p>
                    <div className="theme-select">
                        <p>THEME</p>

                        <div className="selector-box">
                            <div className="selector-nums">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                            </div>
                            <div className="selector" style={keypadStyle}>
                                <div className="selector-item" style={{backgroundColor: theme === 1 ? "hsl(6, 63%, 50%)" : "rgb(87, 136, 180, 0)"}} onClick={() => setTheme(1)}></div>
                                <div className="selector-item" style={{backgroundColor: theme === 2 ? "hsl(25, 98%, 40%)" : "rgb(87, 136, 180, 0)"}} onClick={() => setTheme(2)}></div>
                                <div className="selector-item" style={{backgroundColor: theme === 3 ? "hsl(176, 100%, 44%)" : "rgb(87, 136, 180, 0)"}} onClick={() => setTheme(3)}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-two" style={screenStyle}>
                    <div>
                        {calculate.val != null &&  <p style={{fontSize: "0.7em"}}>{calculate.val} {calculate.operator}</p>}
                        <p>{inputValue}</p>
                    </div>
                </div>
                <div className="section-three" style={keypadStyle}>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("7")}>7</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("8")}>8</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("9")}>9</div>
                    <div className="nums del" style={deleteStyles} onClick={deleteValue}>DEL</div>

                    <div className="nums" style={keyStyles} onClick={() => updateValue("4")}>4</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("5")}>5</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("6")}>6</div>
                    <div className="nums" style={keyStyles} onClick={() => handleCalculate("+")}>+</div>

                    <div className="nums" style={keyStyles} onClick={() => updateValue("1")}>1</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("2")}>2</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("3")}>3</div>
                    <div className="nums" style={keyStyles} onClick={() => handleCalculate("-")}>-</div>

                    <div className="nums" style={keyStyles} onClick={() => updateValue(".")}>.</div>
                    <div className="nums" style={keyStyles} onClick={() => updateValue("0")}>0</div>
                    <div className="nums" style={keyStyles} onClick={() => handleCalculate("/")}>/</div>
                    <div className="nums" style={keyStyles} onClick={() => handleCalculate("*")}>x</div>

                    <div className="nums reset" style={deleteStyles} onClick={() => {setInputValue(""); setCalculate({val: null, operator: null})}}>RESET</div>
                    <div className="nums eq" style={eqStyle} onClick={() => handleCalculate("")}>=</div>
                </div>
            </div>
        </div>
    )
}

export default App